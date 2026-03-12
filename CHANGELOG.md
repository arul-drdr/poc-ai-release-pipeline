# Changelog

## [1.13.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.12.0...poc-ai-release-pipeline-v1.13.0) (2026-03-12)


### New Features

* **release:** TRAIN-1376 Weekly release demo ([#55](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/55)) ([fbc61ab](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/fbc61ab1e73c3f4302a4e267d92ab6dff0fce411))

## [1.12.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.11.0...poc-ai-release-pipeline-v1.12.0) (2026-03-12)


### New Features

* **ci:** add PR merge notification to Notion and Slack ([#5](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/5)) ([67070ce](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/67070cee1fc38c054b40f0fbb3f731088504cc00))
* **ci:** implement AI-powered release pipeline ([c4008d7](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/c4008d78cd503081ec4a48b641f7607e6a3781e8))
* **ci:** TRAIN-1194 Auto-fill PR body from Jira task data ([#16](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/16)) ([5b4df39](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/5b4df39fd04b17de9cf54fc791087699586fb621))
* **ci:** TRAIN-1365 Add AI-powered code review, categorization, and release notes ([#23](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/23)) ([a46eedc](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/a46eedc3cbda4726ad1fb33e0909ae075969c082))
* **ci:** TRAIN-1369 Add AC compliance validation and multi-Jira support ([#30](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/30)) ([6f6b38c](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/6f6b38ca14f150ab14159e397cacab64a8e6538e))
* **scripts:** TRAIN-1368 Add capitalize words function ([#48](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/48)) ([2328284](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/2328284d6bf8c180be61b527bd4c584e43d1aaab))
* TRAIN-1369, TRAIN-1368 ([#34](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/34)) ([0f51da8](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/0f51da86b7028aae245b888bcc2ceb7e27833dff))
* TRAIN-1369, TRAIN-1368 ([#37](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/37)) ([0ccb9f1](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/0ccb9f1abc4e955bca306b6dd48f4c7cf879f624))
* TRAIN-1369, TRAIN-1368 ([#40](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/40)) ([8dd172b](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/8dd172b4eb4a111eaff72e7eb30f96064c81725c))
* **utils:** TRAIN-1365 Add string reverse utility ([#19](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/19)) ([340cd9a](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/340cd9afb4174b9854d44ed83ef1c56c596ff951))
* **utils:** TRAIN-1366 Add FizzBuzz utility function ([#25](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/25)) ([5985afb](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/5985afbd458418734dace3fc5de360bc58cf9ef6))


### Bug Fixes

* **ci:** align Notion API payload with actual database properties ([#7](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/7)) ([4e30dbf](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/4e30dbf8c3fe3bd1adafe21cdf1b75ac0d94453e))
* **ci:** Handle release-please PRs in Notion and Slack notifications ([#21](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/21)) ([fe1b793](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/fe1b79312f0e96f9aa414a8d9910f43e2f28dfed))
* **ci:** match Notion Bug Fixes type and remove Breaking Change ([#13](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/13)) ([73a32d1](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/73a32d1f9056bc596117f53b633b0fbd933c4056))
* **ci:** TRAIN-1194 Fix Jira labels, validation skip, and Notion fields ([#11](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/11)) ([c87e4d5](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/c87e4d594c49f1a57f5887c9df019808ef32a095))
* **ci:** TRAIN-1366 Improve AI release notes prompt to avoid false "internal" classification ([#27](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/27)) ([bdddc74](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/bdddc74804ae801d7a30e0a88498505bd5df190f))
* **ci:** TRAIN-1368 Auto-fill Contributors and PR Author independently of Jira ([#49](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/49)) ([df9a88c](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/df9a88cc83ebcf9d1afce81656dc4c0f6b4099b4))
* **ci:** TRAIN-1369 Add Release Notes property to Notion page ([#45](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/45)) ([13ad2fb](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/13ad2fb267f1076ac8ab8db6750a90b70f245b5d))
* **ci:** TRAIN-1369 Change Task Id to multi_select for Notion schema ([#39](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/39)) ([aa0d44e](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/aa0d44eff275cf0ef5366cc05c882a5095236bda))
* **ci:** TRAIN-1369 Fetch latest PR body for Notion release notes ([#44](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/44)) ([87ea61e](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/87ea61e0e54700f6c16552d8476365848d583561))
* **ci:** TRAIN-1369 Fix Notion and Slack JSON payload construction ([#35](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/35)) ([3e6f4aa](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/3e6f4aa7e48da919e4cb4955c2206319cda7b471))
* **ci:** TRAIN-1369 Fix Notion Contributors and Summary fields ([#42](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/42)) ([2ffef67](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/2ffef676beb21fbe200fe9c1fff15c739b4fb7ab))
* **ci:** use RELEASE_PAT for GitHub Models API access ([#3](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/3)) ([c02bf5b](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/c02bf5baf0abfcdd8675bf9fdb228b0d26a804b2))
* **ci:** use status type instead of select for Notion Status property ([#9](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/9)) ([c8faeb5](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/c8faeb595b3ae335e1140eeb1b3a5e182ffaebba))


### Maintenance

* **main:** release poc-ai-release-pipeline 1.1.0 ([#1](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/1)) ([dfdc6aa](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/dfdc6aa065642ee4fdebf2c42b992188e4222899))
* **main:** release poc-ai-release-pipeline 1.1.1 ([#4](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/4)) ([5b164e5](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/5b164e5f4d48efc661a70cd0ac39fc42fe1a7f11))
* **main:** release poc-ai-release-pipeline 1.10.0 ([#41](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/41)) ([7fe0ca9](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/7fe0ca96d060e1d33896a208ae4856dd05646885))
* **main:** release poc-ai-release-pipeline 1.10.1 ([#43](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/43)) ([22fff6a](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/22fff6a6ee0b1993857afa0bb9569a75d7cedd7c))
* **main:** release poc-ai-release-pipeline 1.10.2 ([#46](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/46)) ([a102b1d](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/a102b1d5be4b3c54e4b6ad60311ba0cb9075d2c3))
* **main:** release poc-ai-release-pipeline 1.10.3 ([#47](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/47)) ([43e3625](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/43e36258f09973d868d3a2d67cbc71541e0a89a3))
* **main:** release poc-ai-release-pipeline 1.10.4 ([#50](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/50)) ([fecb3d9](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/fecb3d902288597192f6086281b5698260b046e2))
* **main:** release poc-ai-release-pipeline 1.11.0 ([#51](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/51)) ([3165728](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/3165728ed1035e5b5ba4ceafb614384eac185509))
* **main:** release poc-ai-release-pipeline 1.2.0 ([#6](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/6)) ([b9c372c](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/b9c372c83446b2a1bb64e552531b1e5558d9f211))
* **main:** release poc-ai-release-pipeline 1.2.1 ([#8](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/8)) ([6e1bd59](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/6e1bd59a6b6cd3e478ba4863b623c548590fda99))
* **main:** release poc-ai-release-pipeline 1.2.2 ([#10](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/10)) ([9712c82](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/9712c825de84ed7f9dab02be02b66bd3978c8842))
* **main:** release poc-ai-release-pipeline 1.2.3 ([#12](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/12)) ([5fddf1c](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/5fddf1c1094565e5f53e9f86311bb6c15f13f9e7))
* **main:** release poc-ai-release-pipeline 1.2.4 ([#14](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/14)) ([733c9af](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/733c9aff128f0c7b309894c7ec21fb7f557f66cc))
* **main:** release poc-ai-release-pipeline 1.3.0 ([#17](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/17)) ([94425ae](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/94425aee4ab9d8eb920d46eea10efe7dcb0e379a))
* **main:** release poc-ai-release-pipeline 1.4.0 ([#20](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/20)) ([a2c39f0](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/a2c39f0d5899c0861cc476833e9e84d406388b68))
* **main:** release poc-ai-release-pipeline 1.4.1 ([#22](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/22)) ([8c9e23b](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/8c9e23be20b1db43b91e56c71b912f2fead9d542))
* **main:** release poc-ai-release-pipeline 1.5.0 ([#24](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/24)) ([c09ec93](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/c09ec93cedd7c2712765f943c8360d7246659029))
* **main:** release poc-ai-release-pipeline 1.6.0 ([#26](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/26)) ([8d359b5](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/8d359b5e9e113ef76872fd4f4db9952c64a05de7))
* **main:** release poc-ai-release-pipeline 1.6.1 ([#28](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/28)) ([e155f53](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/e155f53ba9adf05e381de1eef3d2d3fc235d0a76))
* **main:** release poc-ai-release-pipeline 1.7.0 ([#31](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/31)) ([6551faa](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/6551faaa20e9d3e337038422ad3cd20a1fa25014))
* **main:** release poc-ai-release-pipeline 1.8.0 ([#33](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/33)) ([c8b036a](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/c8b036ab080e7513540c5fdc618a6cd91fdd867b))
* **main:** release poc-ai-release-pipeline 1.8.1 ([#36](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/36)) ([4f9c76f](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/4f9c76ff03d993def35d6b8b4521a268133c2fd4))
* **main:** release poc-ai-release-pipeline 1.9.0 ([#38](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/38)) ([4746d0f](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/4746d0f21c7f33227624d26ffe87a6b1ff833ad9))
* **repo:** TRAIN-1194 Add .gitignore for .NET project ([#2](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/2)) ([a2e96d9](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/a2e96d901b39e4074f4205d0628091c29500cf1c))
* **utils:** TRAIN-1369 Update remove-duplicates JSDoc param description ([#32](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/32)) ([4772207](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/47722072d6334577dd0c8d9181e4955a45f8445e))

## [1.11.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.10.4...poc-ai-release-pipeline-v1.11.0) (2026-03-12)


### New Features

* **scripts:** TRAIN-1368 Add capitalize words function ([#48](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/48)) ([2328284](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/2328284d6bf8c180be61b527bd4c584e43d1aaab))

## [1.10.4](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.10.3...poc-ai-release-pipeline-v1.10.4) (2026-03-12)


### Bug Fixes

* **ci:** TRAIN-1368 Auto-fill Contributors and PR Author independently of Jira ([#49](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/49)) ([df9a88c](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/df9a88cc83ebcf9d1afce81656dc4c0f6b4099b4))

## [1.10.3](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.10.2...poc-ai-release-pipeline-v1.10.3) (2026-03-12)


### Bug Fixes

* **ci:** TRAIN-1369 Fetch latest PR body for Notion release notes ([#44](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/44)) ([87ea61e](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/87ea61e0e54700f6c16552d8476365848d583561))

## [1.10.2](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.10.1...poc-ai-release-pipeline-v1.10.2) (2026-03-12)


### Bug Fixes

* **ci:** TRAIN-1369 Add Release Notes property to Notion page ([#45](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/45)) ([13ad2fb](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/13ad2fb267f1076ac8ab8db6750a90b70f245b5d))

## [1.10.1](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.10.0...poc-ai-release-pipeline-v1.10.1) (2026-03-12)


### Bug Fixes

* **ci:** TRAIN-1369 Fix Notion Contributors and Summary fields ([#42](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/42)) ([2ffef67](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/2ffef676beb21fbe200fe9c1fff15c739b4fb7ab))

## [1.10.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.9.0...poc-ai-release-pipeline-v1.10.0) (2026-03-11)


### New Features

* TRAIN-1369, TRAIN-1368 ([#40](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/40)) ([8dd172b](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/8dd172b4eb4a111eaff72e7eb30f96064c81725c))

## [1.9.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.8.1...poc-ai-release-pipeline-v1.9.0) (2026-03-11)


### New Features

* TRAIN-1369, TRAIN-1368 ([#37](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/37)) ([0ccb9f1](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/0ccb9f1abc4e955bca306b6dd48f4c7cf879f624))


### Bug Fixes

* **ci:** TRAIN-1369 Change Task Id to multi_select for Notion schema ([#39](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/39)) ([aa0d44e](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/aa0d44eff275cf0ef5366cc05c882a5095236bda))

## [1.8.1](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.8.0...poc-ai-release-pipeline-v1.8.1) (2026-03-11)


### Bug Fixes

* **ci:** TRAIN-1369 Fix Notion and Slack JSON payload construction ([#35](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/35)) ([3e6f4aa](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/3e6f4aa7e48da919e4cb4955c2206319cda7b471))

## [1.8.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.7.0...poc-ai-release-pipeline-v1.8.0) (2026-03-11)


### New Features

* TRAIN-1369, TRAIN-1368 ([#34](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/34)) ([0f51da8](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/0f51da86b7028aae245b888bcc2ceb7e27833dff))


### Maintenance

* **utils:** TRAIN-1369 Update remove-duplicates JSDoc param description ([#32](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/32)) ([4772207](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/47722072d6334577dd0c8d9181e4955a45f8445e))

## [1.7.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.6.1...poc-ai-release-pipeline-v1.7.0) (2026-03-11)


### New Features

* **ci:** TRAIN-1369 Add AC compliance validation and multi-Jira support ([#30](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/30)) ([6f6b38c](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/6f6b38ca14f150ab14159e397cacab64a8e6538e))

## [1.6.1](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.6.0...poc-ai-release-pipeline-v1.6.1) (2026-03-11)


### Bug Fixes

* **ci:** TRAIN-1366 Improve AI release notes prompt to avoid false "internal" classification ([#27](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/27)) ([bdddc74](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/bdddc74804ae801d7a30e0a88498505bd5df190f))

## [1.6.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.5.0...poc-ai-release-pipeline-v1.6.0) (2026-03-11)


### New Features

* **utils:** TRAIN-1366 Add FizzBuzz utility function ([#25](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/25)) ([5985afb](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/5985afbd458418734dace3fc5de360bc58cf9ef6))

## [1.5.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.4.1...poc-ai-release-pipeline-v1.5.0) (2026-03-11)


### New Features

* **ci:** TRAIN-1365 Add AI-powered code review, categorization, and release notes ([#23](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/23)) ([a46eedc](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/a46eedc3cbda4726ad1fb33e0909ae075969c082))

## [1.4.1](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.4.0...poc-ai-release-pipeline-v1.4.1) (2026-03-10)


### Bug Fixes

* **ci:** Handle release-please PRs in Notion and Slack notifications ([#21](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/21)) ([fe1b793](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/fe1b79312f0e96f9aa414a8d9910f43e2f28dfed))

## [1.4.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.3.0...poc-ai-release-pipeline-v1.4.0) (2026-03-10)


### New Features

* **utils:** TRAIN-1365 Add string reverse utility ([#19](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/19)) ([340cd9a](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/340cd9afb4174b9854d44ed83ef1c56c596ff951))

## [1.3.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.2.4...poc-ai-release-pipeline-v1.3.0) (2026-03-10)


### New Features

* **ci:** TRAIN-1194 Auto-fill PR body from Jira task data ([#16](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/16)) ([5b4df39](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/5b4df39fd04b17de9cf54fc791087699586fb621))

## [1.2.4](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.2.3...poc-ai-release-pipeline-v1.2.4) (2026-03-10)


### Bug Fixes

* **ci:** match Notion Bug Fixes type and remove Breaking Change ([#13](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/13)) ([73a32d1](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/73a32d1f9056bc596117f53b633b0fbd933c4056))

## [1.2.3](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.2.2...poc-ai-release-pipeline-v1.2.3) (2026-03-10)


### Bug Fixes

* **ci:** TRAIN-1194 Fix Jira labels, validation skip, and Notion fields ([#11](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/11)) ([c87e4d5](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/c87e4d594c49f1a57f5887c9df019808ef32a095))

## [1.2.2](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.2.1...poc-ai-release-pipeline-v1.2.2) (2026-03-10)


### Bug Fixes

* **ci:** use status type instead of select for Notion Status property ([#9](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/9)) ([c8faeb5](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/c8faeb595b3ae335e1140eeb1b3a5e182ffaebba))

## [1.2.1](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.2.0...poc-ai-release-pipeline-v1.2.1) (2026-03-10)


### Bug Fixes

* **ci:** align Notion API payload with actual database properties ([#7](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/7)) ([4e30dbf](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/4e30dbf8c3fe3bd1adafe21cdf1b75ac0d94453e))

## [1.2.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.1.1...poc-ai-release-pipeline-v1.2.0) (2026-03-10)


### New Features

* **ci:** add PR merge notification to Notion and Slack ([#5](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/5)) ([67070ce](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/67070cee1fc38c054b40f0fbb3f731088504cc00))

## [1.1.1](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.1.0...poc-ai-release-pipeline-v1.1.1) (2026-03-10)


### Bug Fixes

* **ci:** use RELEASE_PAT for GitHub Models API access ([#3](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/3)) ([c02bf5b](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/c02bf5baf0abfcdd8675bf9fdb228b0d26a804b2))

## [1.1.0](https://github.com/arul-drdr/poc-ai-release-pipeline/compare/poc-ai-release-pipeline-v1.0.0...poc-ai-release-pipeline-v1.1.0) (2026-03-10)


### New Features

* **ci:** implement AI-powered release pipeline ([c4008d7](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/c4008d78cd503081ec4a48b641f7607e6a3781e8))


### Maintenance

* **repo:** TRAIN-1194 Add .gitignore for .NET project ([#2](https://github.com/arul-drdr/poc-ai-release-pipeline/issues/2)) ([a2e96d9](https://github.com/arul-drdr/poc-ai-release-pipeline/commit/a2e96d901b39e4074f4205d0628091c29500cf1c))
