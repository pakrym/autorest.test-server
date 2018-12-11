# Wiremock sandbox

## LRO

Tentative to model LRO ARM using Wiremock scenario. The only not perfect thing, is that we need one file per step. See:
https://github.com/tomakehurst/wiremock/issues/987

## XML

Testing if XML different syntax were good (like are `<a></a>` and `<a/>` the same thing?)

I didn't find any evidence any broken behavior with XML, all works as expected.

## Files at this root

Basic hello world test. note the `template.json`, that use the template engine of Wiremock to have generic recording.