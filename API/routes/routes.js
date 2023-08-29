const routes = [
    {
        path: '/advisors',
        type: 'advisor',
        methods: {
            GET: { operation: 'getAdvisors' },
            POST: { operation: 'createAdvisor', input: 'CreateAdvisorInput' },
        },
        fields: "advisor_id,fullname,experience_level,contact_info,start_date,termination_date,status"
    },
    {
        path: '/advisors/:id',
        type: 'Advisor',
        methods: {
            GET: { operation: 'getAdvisor' },
            PUT: { operation: 'updateAdvisor' },
            DELETE: { operation: 'deleteAdvisor' }
        },
        fields: "advisor_id,fullname,experience_level,contact_info,start_date,termination_date,status"
    }
];

export default routes;