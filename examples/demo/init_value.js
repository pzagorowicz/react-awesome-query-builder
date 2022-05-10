export default 
{
  "type": "group",
  "id": "9a99988a-0123-4456-b89a-b1607f326fd8",
  "children1": {
    "8b8a9ba9-89ab-4cde-b012-3180d17633b7": {
      "type": "rule",
      "properties": {
        "operator": "equal",
        "lhsValueSrc": [
          "func"
        ],
        "valueType": [
          "text"
        ],
        "lhsValueError": [
          null
        ],
        "value": [
          {
            "func": "LOWER",
            "args": {
              "str": {
                "valueSrc": "field",
                "value": "user.login"
              }
            }
          }
        ],
        "valueSrc": [
          "func"
        ],
        "lhsValueType": [
          "text"
        ],
        "valueError": [
          null
        ],
        "lhsValue": [
          {
            "func": "LOWER",
            "args": {
              "str": {
                "valueSrc": "field",
                "value": "user.firstName"
              }
            }
          }
        ]
      }
    }
  },
  "properties": {
    "conjunction": "AND",
    "not": false
  }
};