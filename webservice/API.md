# REST Endpoints


## Get Patient Info
Gets a json containing a patient's information
| <b>Method</b> | GET |
|-|-|
| Route | /patient/{id} |
Parameters

| Key | Required | Description |
|-|-|-|
| username | required| Username for OAuth |
| password | required| Password for OAuth |

## Get Session Info
| <b>Method</b> | GET |
|----------|--------------------|
| Route | /session/{id} |
Parameters

| Key | Required | Description |
|-|-|-|
| username | required| Username for OAuth |
| password | required| Password for OAuth |

## Get sentiment of frame
| <b>Method</b> | GET |
|----------|--------------------|
| Route | /sentiment/frame |
Parameters

| Key | Required | Description |
|-|-|-|
| username | required| Username for OAuth |
| password | required| Password for OAuth |
| image | required| A binary file, base64 data, or a URL for an image |

## Process frame
Frame is stored in session info along with sentiment
| <b>Method</b> | POST |
|----------|--------------------|
| Route | /sentiment/frame/{session_id} |
Parameters

| Key | Required | Description |
|-|-|-|
| username | required| Username for OAuth |
| password | required| Password for OAuth |
| image | required| A binary file, base64 data, or a URL for an image |

## Get sentiment of frame
| <b>Method</b> | GET |
|----------|--------------------|
| Route | /sentiment/frame |
Parameters

| Key | Required | Description |
|-|-|-|
| username | required| Username for OAuth |
| password | required| Password for OAuth |
| image | required| A binary file, base64 data, or a URL for an image |

## Process frame
Frame is stored in session info along with sentiment
| <b>Method</b> | POST |
|----------|--------------------|
| Route | /sentiment/frame/{session_id} |
Parameters

| Key | Required | Description |
|-|-|-|
| username | required| Username for OAuth |
| password | required| Password for OAuth |
| image | required| A binary file, base64 data, or a URL for an image |

## Get sentiment of text
| <b>Method</b> | GET |
|----------|--------------------|
| Route | /sentiment/text |
Parameters

| Key | Required | Description |
|-|-|-|
| username | required| Username for OAuth |
| password | required| Password for OAuth |
| text | required| String to analyze sentiment of |

## Process text
Text is stored in session info along with sentiment
| <b>Method</b> | POST |
|----------|--------------------|
| Route | /sentiment/text/{session_id} |
Parameters

| Key | Required | Description |
|-|-|-|
| username | required| Username for OAuth |
| password | required| Password for OAuth |
| text | required| String to analyze sentiment of |

## Get Metrics
Get metrics across time
| <b>Method</b> | POST |
|----------|--------------------|
| Route | /metrics/{session_id} |
Parameters

| Key | Required | Description |
|-|-|-|
| username | required | Username for OAuth |
| password | required | Password for OAuth |
| metrics | required | List of metrics to get in response |
| begin | optional | Begin timestamp for metrics (defaults to beginning) |
| end | optional | End timestamp for metrics (defaults to end or current time) |

## Get Metrics Aggregate
Get metrics summary across time
| <b>Method</b> | POST |
|----------|--------------------|
| Route | /metrics/{session_id}/aggregate |
Parameters

| Key | Required | Description |
|-|-|-|
| username | required | Username for OAuth |
| password | required | Password for OAuth |
| metrics | required | List of metrics to get in response |
| begin | optional | Begin timestamp for metrics (defaults to beginning) |
| end | optional | End timestamp for metrics (defaults to end or current time) |
