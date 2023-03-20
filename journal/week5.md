# Week 5 — DynamoDB and Serverless Caching

# Dynamo DB
AWS DynamoDB is a fully managed NoSQL database service offered by Amazon Web Services. It provides a fast and flexible NoSQL database that can handle any amount of data and scale up or down based on demand. DynamoDB is designed to deliver high availability, durability, and scalability, making it a popular choice for applications that require low latency and high throughput.

# Key concepts of DynamoDB:
1. Tables: In DynamoDB, data is stored in tables. A table is a collection of items, where each item is a set of key-value pairs.
2. Primary Keys: Each table in DynamoDB must have a primary key, which uniquely identifies each item in the table. The primary key can be either a single attribute (simple primary key) or a combination of two attributes (composite primary key).
3. Throughput: In DynamoDB, throughput is measured in read and write capacity units. Read capacity units represent the number of read requests per second that can be processed, while write capacity units represent the number of write requests per second that can be processed.
4. Auto Scaling: DynamoDB provides an auto-scaling feature that automatically adjusts the provisioned throughput capacity of a table based on the incoming traffic.
5. Global Tables: DynamoDB Global Tables is a multi-region, fully managed database replication solution that enables you to replicate your DynamoDB tables across multiple AWS regions.

# Access Patters in NoSQL DataBases
Access patterns refer to the ways in which data is accessed or retrieved from a database or storage system. Access patterns play a crucial role in determining the performance, scalability, and cost-effectiveness of a system. By understanding and optimizing access patterns, developers can improve the efficiency and reliability of their applications.Optimizing access patterns can involve a variety of techniques such as indexing, caching, partitioning, and sharding. By carefully analyzing and optimizing access patterns, developers can ensure that their systems are performant, scalable, and cost-effective.

# Common access patterns:
1. Key-Value Access: In this access pattern, data is accessed by a unique key value. This pattern is commonly used in NoSQL databases like AWS DynamoDB and Redis.
2. Query Access: This access pattern involves querying a database based on specific criteria. For example, querying a database to retrieve all records that meet a certain set of conditions.
3. Scan Access: In this access pattern, a database is scanned to retrieve all records that meet a certain set of conditions. This pattern can be resource-intensive and should be used with caution.
4. Aggregation Access: This access pattern involves performing calculations or aggregations on a set of data. For example, calculating the sum or average of a set of values.
5. Range Access: This access pattern involves retrieving a range of values from a database. For example, retrieving all records that fall within a specific date range.

# Pre Computing 
Precomputing the output of an application refers to the process of calculating and storing the results of a computation ahead of time, rather than performing the computation in real-time when a user makes a request. By precomputing the output, an application can improve its speed, scalability, and cost-effectiveness.

1. Improved Performance: Precomputing the output of an application can significantly improve its performance by reducing the time it takes to compute and return results to the user. This is because the precomputed results are readily available and can be retrieved and returned to the user much faster than if the computation had to be performed in real-time.
2. Scalability: Precomputing the output of an application can also improve its scalability. By precomputing results, an application can offload processing power and reduce the number of requests it needs to handle in real-time, which can help it handle more concurrent users and traffic.
3. Cost-Effectiveness: Precomputing the output of an application can also reduce the cost of running the application. By reducing the amount of processing power needed to handle requests, an application can reduce the number of servers it needs to run on, which can help reduce infrastructure and operational costs.

# GSI GLOBAL SECONDARY INDEX vs LSI LOCAL SECONDARY INDEX
AWS DynamoDB, indexes are used to improve the performance of queries on a table. There are two types of indexes available: Global Secondary Indexes (GSI) and Local Secondary Indexes (LSI). , GSIs and LSIs are both powerful tools for optimizing queries in DynamoDB. GSIs provide more flexibility and can be created after the table has been created, but they are more expensive. LSIs are limited to a single partition key but are less expensive and can be created when creating the table.

1. Global Secondary Index (GSI): A GSI is an index that allows querying a DynamoDB table using a non-key attribute. A GSI has its own partition key and sort key, which can be different from the table's primary key. A GSI can be created at any time after the table has been created. When querying a GSI, DynamoDB retrieves the data from the index instead of the table, which can improve query performance.
2. Local Secondary Index (LSI): An LSI is an index that allows querying a DynamoDB table using a non-key attribute, but the partition key is the same as the table's primary key. An LSI can be created when creating the table or later, but it can only be created at the time of table creation if the table has a composite primary key. LSIs are limited to a single partition key, which means that they are only useful for queries that retrieve data for a specific partition key.

# Key differences between GSI and LSI:

1. Partition Key: GSIs have their own partition key, which can be different from the table's primary key. LSIs use the same partition key as the table's primary key.
2. Sort Key: Both GSIs and LSIs have their own sort key, which can be different from the table's primary key.
3. Creation: GSIs can be created at any time after the table has been created. LSIs can only be created when creating the table or later, but only if the table has a composite primary key.
4. Query Flexibility: GSIs provide more flexibility in querying data than LSIs because they have their own partition key. LSIs are limited to a single partition key, which means they can only be used for queries that retrieve data for a specific partition key.
5. Cost: GSIs are more expensive than LSIs because they require additional read and write capacity units, and they have their own partition key.

# How can we make multiple requests to the database with a single query with BATCH-WRITTEN-API
In AWS DynamoDB, it is possible to use a single query to perform multiple database operations such as create, put, delete, and update requests. This is achieved by using the BatchWriteItem API, which allows multiple write operations to be executed in a single call,  by using the BatchWriteItem API in DynamoDB, it is possible to perform multiple create, put, delete, and update requests in a single query, which can improve performance and reduce costs, Using the BatchWriteItem API can help reduce the number of requests made to DynamoDB, which can improve performance and reduce costs. However, it is important to note that this approach may not be suitable for all use cases, particularly those that require complex business logic or atomic transactions.

How the api works:
1. Define the WriteRequests: The BatchWriteItem API takes a list of WriteRequests that specify the operations to be performed on the DynamoDB table. Each WriteRequest can be a PutRequest, DeleteRequest, or UpdateRequest.
2. Group the WriteRequests: The WriteRequests are grouped into batches, where each batch can contain up to 25 items or a maximum of 16 MB of data.
3. Execute the BatchWriteItem API: Once the batches are defined, the BatchWriteItem API is called to execute the write operations in the batches. DynamoDB processes the write operations in parallel, which can improve the performance of the overall operation.





