/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function queryHasuraGRQ(operationsDoc, operationName, variables) {
    const result = await fetch(
        process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
            method: "POST",
            headers: {
                'content-type': "application/json",
                "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET
            },
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );

    return await result.json();
}

const operationsDoc = `
    query MyQuery {
      users {
        email
        id
        issuer
      }
    }
  `;

function fetchMyQuery() {
    return queryHasuraGRQ(
        operationsDoc,
        "MyQuery", {}
    );
}

export async function startFetchMyQuery() {
    const {
        errors,
        data
    } = await fetchMyQuery();

    if (errors) {
        // handle those errors like a pro
        console.error(errors, "from GQL");
    }

    // do something great with this precious data
    console.log(data);
}