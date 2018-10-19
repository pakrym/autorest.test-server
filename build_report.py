import xml.etree.ElementTree as ET

import requests

BASE_URL = "http://localhost:3000"

REQUESTS_ENDPOINT = "/__admin/requests"
MAPPINGS_ENDPOINT = "/__admin/mappings"


def get_requests():
    response = requests.get(BASE_URL + REQUESTS_ENDPOINT)
    response.raise_for_status()
    return response.json()['requests']

def get_mappings():
    response = requests.get(BASE_URL + MAPPINGS_ENDPOINT)
    response.raise_for_status()
    return response.json()['mappings']

def build_json_report():
    requests = get_requests()
    mappings = get_mappings()

    tests = {}

    for mapping in mappings:
        if not mapping['id']:
            raise ValueError(mapping)
        tests[mapping['id']] = {
            'name': mapping.get('name', mapping['id']) or mapping['id'],
            'state': False
        }

    for request in requests:
        if request["wasMatched"]:
            print(request['id'])
            tests[request["stubMapping"]["id"]]['state'] = True

    return tests

def build_junit_xml(tests):
    """
<testsuite tests="3">
    <testcase classname="foo1" name="ASuccessfulTest"/>
    <testcase classname="foo2" name="AnotherSuccessfulTest"/>
    <testcase classname="foo3" name="AFailingTest">
        <failure type="NotEnoughFoo"> details about failure </failure>
    </testcase>
</testsuite>
    """
    print("Building report")
    failed = 0
    testsuite = ET.Element('testsuite', tests=str(len(tests)), name='TestServer', errors="0")
    for test_id, test in tests.items():
        print(test_id)
        print(test)
        testcase = ET.SubElement(testsuite, 'testcase', classname="Python", name=test['name']+'-'+test_id, time="0")
        if not test['state']:
            ET.SubElement(testcase, 'failure')
            failed += 1

    testsuite.set("failures", str(failed))

    return testsuite

def serialize_report(xml_report, file="report.xml"):
    with open(file, "wb") as fd:
        bytes_data = ET.tostring(xml_report, encoding="utf-8")
        fd.write(bytes_data)

def main():
    report = build_json_report()
    xml_report = build_junit_xml(report)
    serialize_report(xml_report)

if __name__ == '__main__':
    main()
