
    const schema = {
  "asyncapi": "3.0.0",
  "id": "urn:iqb-specifications:item-matrix-rules",
  "defaultContentType": "application/json",
  "info": {
    "title": "Item Matrix Rules",
    "description": "Rules for translating variable response status into item values.",
    "license": {
      "name": "CC0 1.0",
      "url": "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    "version": " - click on schema id to expand",
    "contact": {
      "name": "Home of iqb-specifications (German only)",
      "url": "https://iqb-specifications.github.io/"
    }
  },
  "channels": {
    "iqb_data_structures": {
      "address": "iqb_data_structures",
      "messages": {
        "select_schema": {
          "payload": {
            "$id": "item-matrix-rules@0.2",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Item Matrix Rules",
            "description": "Rules for translating variable response status into item values.",
            "type": "object",
            "properties": {
              "itemNaming": {
                "type": "object",
                "description": "Rules to deviate the id of the item from unit id/alias and variable id",
                "properties": {
                  "separator": {
                    "description": "Character between unit id/alias and variable id",
                    "type": "string",
                    "default": "",
                    "x-parser-schema-id": "<anonymous-schema-2>"
                  },
                  "omitUnitAliasIfVariableIdLongerThan": {
                    "description": "Item id will be taken from variable id w/o prefix. '0' = always prefix",
                    "type": "integer",
                    "default": 0,
                    "x-parser-schema-id": "<anonymous-schema-3>"
                  },
                  "useUnitAliasIfSingleVariable": {
                    "description": "If only one variable exists per unit, the item id will be taken from unit alias w/o suffix.",
                    "type": "boolean",
                    "default": false,
                    "x-parser-schema-id": "<anonymous-schema-4>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1>"
              },
              "missingsMap": {
                "description": "Rules how to translate response status into item value if not CODING_COMPLETE",
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "onResponseStatus": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "enum": [
                          "UNSET",
                          "NOT_REACHED",
                          "DISPLAYED",
                          "INVALID",
                          "CODING_ERROR"
                        ],
                        "x-parser-schema-id": "<anonymous-schema-8>"
                      },
                      "minItems": 1,
                      "x-parser-schema-id": "<anonymous-schema-7>"
                    },
                    "itemScore": {
                      "type": "integer",
                      "default": -99,
                      "x-parser-schema-id": "<anonymous-schema-9>"
                    }
                  },
                  "required": [
                    "onResponseStatus"
                  ],
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-6>"
                },
                "x-parser-schema-id": "<anonymous-schema-5>"
              },
              "missingElseItemScore": {
                "type": "integer",
                "default": -99,
                "x-parser-schema-id": "<anonymous-schema-10>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "item-matrix-rules@0.2"
          },
          "x-parser-unique-object-id": "select_schema",
          "x-parser-message-name": "select_schema"
        }
      },
      "x-parser-unique-object-id": "iqb_data_structures"
    }
  },
  "components": {
    "schemas": {
      "item-matrix-rules": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload"
    }
  },
  "x-parser-spec-parsed": true,
  "x-parser-api-version": 3,
  "x-parser-spec-stringified": true
};
    const config = {"show":{"sidebar":false},"sidebar":{"showOperations":"byDefault"},"showOperations":false};
    const appRoot = document.getElementById('root');
    AsyncApiStandalone.render(
        { schema, config, }, appRoot
    );
  