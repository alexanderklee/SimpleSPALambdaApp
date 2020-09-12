exports.handler = (event, context, callback) => {
    const token = event.authorizationToken;
    
    if (token === 'allow') {
        const policy = generatePolicy('allow', event.methodArn);
        const principalId = 'foobar';
        const context = {
            simpleAuth: true 
        };
        const response = {
            principalId: principalId,
            policyDocument: policy,
            context: context
        };
        callback(null, response);
    } else if (token === 'deny') {
        const policy = generatePolicy('deny', event.methodArn);
        const principalId = 'foobar';
        const context = {
            simpleAuth: true 
        };
        const response = {
            principalId: principalId,
            policyDocument: policy,
            context: context
        };
        callback(null, response);     
    } else {
            callback('Unauthorized');
    }
};

function generatePolicy(effect, resource) {
    const policy = {};
    policy.Version = '2012-10-17';
    policy.Statement = [];
    const stmt = {};
    stmt.Action = 'execute-api:Invoke';
    stmt.Effect = effect;
    stmt.Resource = resource;
    policy.Statement.push(stmt);
    return policy;
};
