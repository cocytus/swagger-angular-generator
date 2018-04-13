import {generate} from '../../src/generate';

class TestInitClass {
  createTestContent() {
    generate('swagger-files/unit-test-swagger.json', 'generated', '/swagger');
  }
}

const testInitClass = new TestInitClass();
testInitClass.createTestContent();
