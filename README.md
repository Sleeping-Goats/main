# Sleepy Goats

A Junction 2023 Hackathon project.

<p align="center">
  <img width="200" height="200" src="https://github.com/Sleeping-Goats/main/assets/38818382/9f5937ae-8ea2-4242-8a3c-18aec65eb451">
</p>

Sleeping Goat is a sustainable AI assistant designed for dynamic information retrieval and summarization, catering to crucial business needs.

We leverage the Electricity Maps API to schedule data scraping during low-emission periods, ensuring our operations are as green as possible.

Users have control over the data sources, which range from news aggregators to patent databases. Our curated packs guarantee reliability, avoiding hallucinations and misinformation.

![image](https://github.com/Sleeping-Goats/main/assets/38818382/6392a724-1674-481e-8260-cc311e811d09)


## Architectural Overview

![image](https://github.com/Sleeping-Goats/main/assets/38818382/738425f0-9ab4-4f57-ba23-2d089e98efb4)

Our AI prioritizes trustworthiness and efficiency. By pre-processing and indexing internet data, we minimize energy consumption and carbon footprint, unlike conventional real-time processing.

With RAG, or resource-augmented generation, the AI's context is pre-evaluated from trusted sources, supplemented by daily updates and real-time scraping options for the latest information.

Sleepy Goat provides a general Framework for interactions.
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

