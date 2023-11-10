# Sleepy Goats

Junction 2023 Submission

## Architectural Overview

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
        UpdateRelStyle(pManager, s1, $textColor="blue", $lineColor="blue", $offsetY="20", $offsetX="-40")
        Rel(pManager, s2, "Access & Summarize Information")
        UpdateRelStyle(pManager, s2, $textColor="blue", $lineColor="blue", $offsetY="-30", $offsetX="-80")
        Rel(pManager, s3, "Access & Summarize Information")
        UpdateRelStyle(pManager, s3, $textColor="blue", $lineColor="blue", $offsetY="-20", $offsetX="-80")
    }

    Rel(gGovernment, sPolicy, "Limits")
    UpdateRelStyle(gGovernment, sPolicy, $textColor="blue", $lineColor="blue", $offsetY="-15")
    Rel(pManager, sPolicy, "Decides")
    UpdateRelStyle(pManager, sPolicy, $textColor="blue", $lineColor="blue")

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

            Boundary(b3, "External Data", "Sources") {
                System_Ext(s1, "External Data Source #1")
                System_Ext(s2, "External Data Source #2")
                System_Ext(s3, "External Data Source #3")
                Rel(sDataRepository, s1, "Access Information")
                UpdateRelStyle(sDataRepository, s1, $textColor="blue", $lineColor="blue", $offsetY="-30", $offsetX="-40")
                Rel(sDataRepository, s2, "Access Information")
                UpdateRelStyle(sDataRepository, s2, $textColor="blue", $lineColor="blue", $offsetY="-30", $offsetX="-40")
                Rel(sDataRepository, s3, "Access Information")
                UpdateRelStyle(sDataRepository, s3, $textColor="blue", $lineColor="blue", $offsetY="-30", $offsetX="40")
            }

            Rel(pManager, sUI, "Query using Natural language")
            UpdateRelStyle(pManager, sUI, $textColor="blue", $lineColor="blue", $offsetY="50", $offsetX="-80")
            Rel(sUI, sAggregator, "Accessing the underlying ML-Model")
            UpdateRelStyle(sUI, sAggregator, $textColor="blue", $lineColor="blue", $offsetY="50", $offsetX="-80")
            Rel(sAggregator, sDataRepository, "Access to the Data stored")
            UpdateRelStyle(sAggregator, sDataRepository, $textColor="blue", $lineColor="blue", $offsetY="50", $offsetX="-80")
        }
    }

    Rel(gGovernment, sPolicy, "Limits")
    UpdateRelStyle(gGovernment, sPolicy, $textColor="blue", $lineColor="blue", $offsetY="-20", $offsetX="10")
    Rel(pManager, sPolicy, "Decides")
    UpdateRelStyle(pManager, sPolicy, $textColor="blue", $lineColor="blue", $offsetY="30", $offsetX="-20")
```

## Evaluation Criteria

To evaluate the current and future implementation the following User-Journey is used as a reference point.

Ranking for each approach is done from 0 (Bad) to 9 (Excellent) inclusive.

### Template

```mermaid
journey
    title Evaluation *XYZ*
    section Decision Making Experience for Decision Makers (Manager)
        Query Experience: 0: Manager
        Handling of Hallucinations: 0: Manager
        Ecological Impact: 0: Manager
        Explainability: 0: Manager

    section Data Ingestion Experience for System Administrators (Admin)
        Data up-to-dateness: 0: Admin
        Resource Usage for ingestion: 0: Admin
        Resource Usage for UI: 0: Admin

    section Software Maintanace & Extensibility
        Ability to change Model: 0: Developer
        Ability to add or modify Data Sources: 0: Developer

```