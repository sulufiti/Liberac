# Server Info

## Table of Contents

- [Overview](#overview)
- [Deployment process](#deployment-process)

# Overview

The easiest place to start is just with a broad overview of what the Liberac server currently is, runs on and so on.

It's hosted on [Microsoft Azure](https://portal.azure.com) which is basically Microsoft's answer to [Amazon AWS](https://aws.amazon.com/), [Google Cloud Platform](https://cloud.google.com/) etc

What advantages does it have over its competitors you might ask?  

Nothing! We just use it (at the time of writing) because it comes with a heap of free credits. That's all so if you're in a position to change providers, go ahead.

Liberac itself is platform agnostic and just needs a Linux VM and Postgres instance to run. You could potentially just Dockerise the whole thing and deploy containers as well but that's up to you.

Anyway, the current "resources" (aka things that are running) under Azure are

| Resource Name | Resource Type | What it does |
| ------------- | ------------- | ------------ |
| liberacfilestorage | Storage Account | Database backups (files) + passport/address proofs (blobs) uploaded from the site are stored here |
| liberacdiag | Storage Account | Some auto diagnostics about the VM application are stored here. It's not really used. |
| LiberacVM | Virtual Machine | The VM which the Liberac Node application and database set up. The site is served from here using Apache2 |
| liberac | App Service | ¯\_(ツ)_/¯ |
| LiberacStaticIP | Public IP Address | The public IP address which is attached to the VM. The website points to this IP address which points to the VM |
| LiberacSecRules | Network Security Group | All the security rules (port white/blacklists etc) |
| ServicePlan7a074905-9f1b | App Service plan | 
| LiberacVM | Disk | The storage disk for the VM. Doesn't store a lot as the database is pretty small. |
| liberacvm599 | Network Interface | Does what it says on the tin. Not really something you can actually access settings for? |

The only things you'd likely ever need to check are `liberacfilestorage`, `LiberacVM (Virtual Machine)` and `LiberacSecRules` on the odd occasion.

# Deployment process

So, you wanna deploy from master to production, huh?