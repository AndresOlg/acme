import Advisor from '../models/mysql/Advisor.js';
import CommissionTypes from '../models/mysql/CommissionType.js';
import Metrics from '../models/mysql/Metrics.js';
import Salary from '../models/mysql/Salary.js';

import Sale from '../models/mongo/Sale.js';
import Commission from '../models/mongo/Commission.js';
import { Op } from 'sequelize';


const resolvers = {
    Query: {
        //----------------- MYSQL------------------
        /*-- Advisor --*/
        getAdvisors: async (__, { search }) => {
            if (!search) {
                return Advisor.findAll();
            } else {
                const arraySearch = JSON.parse(search);
                const conditions = [];

                for (const paramSearch of arraySearch) {
                    const [[key, value]] = Object.entries(paramSearch);
                    const likeValue = `%${value}%`;
                    conditions.push({ [key]: { [Op.like]: likeValue } });
                }

                try {
                    const matchingAdvisors = await Advisor.findAll({
                        where: {
                            [Op.and]: conditions
                        }
                    });
                    return matchingAdvisors || [];
                } catch (error) {
                    throw new Error('Error executing query:', error);
                }
            }
        },
        // query a single advisor
        getAdvisor: async (__, args) => {
            try {
                console.log({ args })
                const list = await Advisor.findOne({
                    where: {
                        advisor_id: args.id
                    }
                });
                return [list['dataValues']];
            } catch (error) {
                throw new Error('Error get AdvisorList')
            }
        },
        /*-- commissionType ---*/
        getCommissionTypes: () => [CommissionTypes],
        // query a single commissionType
        getCommissionType: (__, args) => {
            return CommissionTypes.find((ct) => ct.commission_id === args.id);
        },
        /*-- Salary ---*/
        getSalaries: () => [Salary],
        // query a single salary
        getSalary: (__, args) => {
            return Salary.find((salary) => salary._id === args.id);
        },
        /*-- Metrics ---*/
        getMetrics: () => [Salary],
        // query a single metrics
        getMetrics: (__, args) => {
            return Metrics.find((metrics) => metrics.metrics_id === args.id);
        },
        //----------------- MONGODB------------------
        /*-- Sales ---*/
        getSales: () => [Sale],
        // query a single sale
        getSale: (__, args) => {
            return Sale.find((sale) => sale._id === args.id);
        },
        /*-- Commission ---*/
        getCommissions: () => [Sale],
        // query a single commission
        getCommission: (__, args) => {
            return Commission.find((commission) => commission._id === args.id);
        },
    },
    Mutation: {
        createAdvisor: async (_, { input }) => {
            try {
                const newAdvisor = await Advisor.create(input);
                console.log(newAdvisor);
                return newAdvisor;
            } catch (error) {
                throw new Error('Error create advisor: ' + error.message);
            }
        },
        createSale: async (_, { input }) => {
            try {
                const newSale = await Sale(input);
                await newSale.save();
                return input;
            } catch (error) {
                throw new Error('Error create sale: ' + error.message);
            }
        },
        createCommission: async (_, { input }) => {
            try {
                const newCommission = await Commission.create(input);
                return newCommission;
            } catch (error) {
                throw new Error('Error create Commission: ' + error.message);
            }
        },
        createCommissionType: async (_, { input }) => {
            try {
                const newcommissionTypes = await CommissionTypes.create(input);
                return newcommissionTypes;
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },
        createPerformanceMetrics: async (_, { input }) => {
            try {
                const newPerformanceMetrics = await Metrics.create(input);
                return newPerformanceMetrics;
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },
        createSalary: async (_, { input }) => {
            try {
                const newSalary = await Salary.create(input);
                return newSalary;
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },
        deleteAdvisor: async (_, { id }) => {
            try {
                const deletedAdvisor = await Advisor.destroy({ where: { id } });
                if (deletedAdvisor) {
                    return "Deleted operation is successful";
                } else {
                    throw new Error("ID not found");
                }
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },
        deletePerformanceMetrics: async (_, { id }) => {
            try {
                const deletedPerformanceMetrics = await Metrics.destroy({ where: { id } });
                if (deletedPerformanceMetrics) {
                    return "Deleted operation is successful";
                } else {
                    throw new Error("ID not found");
                }
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },

        deleteSale: async (_, { id }) => {
            try {
                const deletedSale = await Sale.findByIdAndDelete(id);
                if (deletedSale) {
                    return "Deleted operation is successful";
                } else {
                    throw new Error("ID not found");
                }
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },
        deleteCommission: async (_, { id }) => {
            try {
                const deletedCommission = await Commission.findByIdAndDelete(id);
                if (deletedCommission) {
                    return "Deleted operation is successful";
                } else {
                    throw new Error("ID not found");
                }
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },
        deleteCommissionType: async (_, { id }) => {
            try {
                const deletedCommissionType = await CommissionTypes.findByIdAndDelete(id);
                if (deletedCommissionType) {
                    return "Deleted operation is successful";
                } else {
                    throw new Error("ID not found");
                }
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },
        deleteSalary: async (_, { id }) => {
            try {
                const deletedCommission = await Salary.findByIdAndDelete(id);
                if (deletedCommission) {
                    return "Deleted operation is successful";
                } else {
                    throw new Error("ID no found");
                }
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },
        updateAdvisor: async (_, { id, input }) => {
            try {
                const updatedAdvisor = await Advisor.update(input, { where: { id } });
                if (updatedAdvisor) {
                    return "Operation is successful";
                } else {
                    throw new Error("ID not found");
                }
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },
        updateSale: async (_, { id, input }) => {
            try {
                const updatedSale = await Sale.findByIdAndUpdate(id, input, { new: true });
                if (updatedSale) {
                    return "Operation is successful";
                } else {
                    throw new Error("ID not found");
                }
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },
        updateCommission: async (_, { id, input }) => {
            try {
                const updatedCommission = await Commission.findByIdAndUpdate(id, input, { new: true });
                if (updatedCommission) {
                    return "Operation is successful";
                } else {
                    throw new Error("ID not found");
                }
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },
        updateCommissionType: async (_, { id, input }) => {
            try {
                const updatedCommissionTypes = await CommissionTypes.findByIdAndUpdate(id, input, { new: true });
                if (updatedCommissionTypes) {
                    return "Operation is successful";
                } else {
                    throw new Error("ID not found");
                }
            } catch (error) {
                throw new Error('Error: ' + error.message);
            }
        },
    },
};

export default resolvers;
