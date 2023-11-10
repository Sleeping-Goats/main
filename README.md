# Sleepy Goats

Sleepy Goats provides a general Framework for interactions.
For documentation purposes a dummy Enterprise "FooBar Enterprises" will be used to represent
any Entity that uses this particular Software.

In a traditional company sense decisions are managed by the following paradigm:

```mermaid
C4Context
    title Sleeping Goats Research Tool
    Person_Ext(gGovernment, "Government", "Regulatory Body that might limit a Business ability through one or more regulatory framework")


    Enterprise_Boundary(b1, "FooBar Enterprises") {
        System(sPolicy, "Enterprise Policy", "All decisions (either public or private) that have an effect on business critical use-cases")
        Person(pManager, "Management", "Decision Makers responsible for business critical use-cases.")
    }

    System_Boundary(b3, "Data Sources") {
        System_Ext(s1, "External Data Source #1")
        System_Ext(s2, "External Data Source #2")
        System_Ext(s3, "External Data Source #3")

        Rel(pManager, s1, "Access & Summarize Information")
        Rel(pManager, s2, "Access & Summarize Information")
        Rel(pManager, s3, "Access & Summarize Information")
    }

    Rel(gGovernment, sPolicy, "Limits")
    Rel(pManager, sPolicy, "Decides")
```

Using our tool the Workflow changes

```mermaid
C4Context
    title Sleeping Goats Research Tool
    Person_Ext(gGovernment, "Government", "Regulatory Body that might limit a Business ability through one or more regulatory framework")

    Enterprise_Boundary(b1, "FooBar Enterprises") {
        System(sPolicy, "Enterprise Policy", "All decisions (either public or private) that have an effect on business critical use-cases")
        Person(pManager, "Management", "Decision Makers responsible for business critical use-cases.")

        System_Boundary(b2, "Sleeping Goats") {
            System(sUI, "Sleeping Goats User Interface")
            System(sAggregator, "Sleeping Goats User Interface")
            System(sDataRepository, "Data Repository", "Accesses data and provides a unified interface for access")

            System_Boundary(b3, "Data Sources") {
                System_Ext(s1, "External Data Source #1")
                System_Ext(s2, "External Data Source #2")
                System_Ext(s3, "External Data Source #3")
                Rel(sDataRepository, s1, "Access Information")
                Rel(sDataRepository, s2, "Access Information")
                Rel(sDataRepository, s3, "Access Information")
            }

            Rel(pManager, sUI, "Query using Natural language")
            Rel(sUI, sAggregator, "Accessing the underlying ML-Model")
            Rel(sAggregator, sDataRepository, "Access to the Data stored")
        }
    }

    Rel(gGovernment, sPolicy, "Limits")
    Rel(pManager, sPolicy, "Decides")
```