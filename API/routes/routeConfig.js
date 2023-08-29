import routes from './routes.js';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { request } from 'graphql-request';

function configureRoutes(app, server) {
    routes.forEach(route => {
        const { path: routePath, methods } = route;
        Object.entries(methods).forEach(([httpMethod, config]) => {
            const { operation } = config;
            app[httpMethod.toLowerCase()](routePath, async (req, res) => {
                const initialTime = Date.now();
                try {
                    const { id } = req.params;
                    const searchParams = req.query;

                    const fields = req.query.fields || '';
                    let operationDef = id ? `${operation}(id: ${id})` : `${operation}`;
                    if (httpMethod == 'GET') {
                        if (Object.keys(searchParams).length > 0) {
                            const searchArgs = Object.entries(searchParams)
                                .map(([key, value]) => { return { [key]: value } });
                            const searchString = JSON.stringify(searchArgs).replaceAll("\"", '\\"');
                            operationDef = `${operationDef}(search: "${searchString}")`
                        }
                    } else {
                        operationDef = `${operationDef}(input: $input)`;
                    }
                    const query = {
                        query: `
                        ${httpMethod == 'GET' ? `query ${route.type}` : `mutation ${operation}($input:${config.input}!)`}  {
                                ${operationDef} {
                                    ${httpMethod === 'GET' ? (fields || route.fields) : route.fields}
                            }
                        }
                        `
                    }

                    if (httpMethod != 'GET') {
                        let variables = JSON.stringify(req.body).trim().replace(/[\n\t]/g, ' ');
                        variables = variables.replaceAll('/\\\"', '/\"')
                        const mutations = query.query.trim().replace(/[\n\t]/g, ' ');
                        const endpoint = process.env.GRAPHQL_URL;
                        try {
                            console.log({ endpoint, mutations, variables })
                            // const data = await request(endpoint, mutations, variables);
                            // console.log({ data })
                            // console.log('Mutation result:', data[operation]);
                        } catch (error) {
                            console.error('Mutation error:', error);
                        }

                    }

                    query.query = query.query.trim().replace(/[\n\t]/g, ' ');
                    const result = await server.executeOperation(query);

                    if (!result['errors']) {
                        const listRecords = Array.from(result.data[operation]);
                        const finalTime = Date.now();
                        return res.status(200).json(
                            {
                                records: listRecords,
                                total: listRecords.length,
                                elapsedTime: `${finalTime - initialTime} ms`
                            }
                        );
                    } else return res.status(500).json({
                        error: `Error ${route.type} modify`
                    })
                } catch (error) {
                    const finalTime = Date.now();
                    console.error(error);
                    res.status(500).json(error,
                        {
                            error: `Error ${route.type} not found`,
                            elapsedTime: `${finalTime - initialTime} ms`
                        });
                }
            });
        })
    });
}
export default configureRoutes;