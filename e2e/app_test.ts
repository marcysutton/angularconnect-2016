import {browser, element, by} from 'protractor';
import * as axe from 'axe-core';

describe('my app', () => {
  beforeEach(() => {
    browser.get('http://localhost:9095/dist');
  });

  it('should play a game by clicking', () => {
    var boxes = element.all(by.css('.ttt-box'));

    boxes.get(1).click();
    browser.sleep(500);

    boxes.get(0).click();
    browser.sleep(500);

    boxes.get(4).click();
    browser.sleep(500);

    boxes.get(2).click();
    browser.sleep(500);

    boxes.get(7).click();

    browser.sleep(500);

    expect(element(by.css('.outcome')).getText()).toEqual('Jane wins!');
  });


  it('should play a game by typing', () => {
    browser.actions().sendKeys("23").perform();
    browser.sleep(500);

    browser.actions().sendKeys("11").perform();
    browser.sleep(500);

    browser.actions().sendKeys("21").perform();
    browser.sleep(500);

    browser.actions().sendKeys("22").perform();
    browser.sleep(500);

    browser.actions().sendKeys("13").perform();
    browser.sleep(500);

    browser.actions().sendKeys("33").perform();
    browser.sleep(500);

    expect(element(by.css('.outcome')).getText()).toEqual('Elizabeth wins!');
  });

  it('should have no accessibility violations', (done) => {

    console.log("Checking Axe Core");

    // Inject the axe-core script into our e2e browser.
    browser.executeScript(axe.source);

    // Run A11Y tests in the browsers event loop.
    browser.executeAsyncScript((resolve:any) => {
      return new Promise<any>(res => axe.a11yCheck(document, {}, resolve));
    }).then((results: any) => {
      if (results.violations.length > 0) {
        printViolations(results.violations);
      }
      expect(results.violations.length).toBe(0);
      done();
    });
  });

  function printViolations(violations:any[]) {
    violations.forEach(violation => {
      let output = '';
      let nodes = violation.nodes.map((node: any) => '  - ' + node.target).join('\n');

      output += '---- ' + violation.id + ' ----\n';
      output += 'Help: ' + violation.help + '\n';
      output += 'Affected Nodes: \n';

      violation.nodes.forEach((node: any) => node.any.forEach((item: any) => {
        output += '- ' + item.message + '\n';
      }));

      console.log(output);
    });
  }
});
