var pkg = JavaImporter(org.openqa.selenium);
var support_ui = JavaImporter(org.openqa.selenium.support.ui.WebDriverWait);
var conditions = org.openqa.selenium.support.ui.ExpectedConditions;
var wait = new support_ui.WebDriverWait(WDS.browser, 100);

WDS.sampleResult.sampleStart();
WDS.sampleResult.getLatency();
WDS.log.info('Sample started');

WDS.browser.get('http://localhost:3000/viewPatient');
WDS.log.info('navigated to view patient page');

var patient_address = WDS.browser.findElement(pkg.By.name('patientAddress'));
patient_address.click();
patient_address.sendKeys([WDS.args[0]]);
WDS.log.info('entered patient address');

WDS.browser.findElement(pkg.By.cssSelector('button.btn.btn-primary')).click();

wait.until(
    conditions.textToBePresentInElement(
        pkg.By.xpath('//table/tbody/tr[1]/td[2]'),
        [WDS.args[0]],
    ),
);

WDS.browser.findElement(pkg.By.cssSelector('button.btn.btn-secondary')).click();

var patient_name = WDS.browser.findElement(pkg.By.name('age'));
patient_name.click();
patient_name.sendKeys([WDS.args[1]]);
WDS.log.info('changed patient age');

var doctor_address = WDS.browser.findElement(pkg.By.name('doctorAddress'));
doctor_address.click();
doctor_address.sendKeys([WDS.args[2]]);
WDS.log.info('entered doctor address');

var doctor_key = WDS.browser.findElement(pkg.By.name('doctorKey'));
doctor_key.click();
doctor_key.sendKeys([WDS.args[3]]);
WDS.log.info('entered doctor key');

WDS.browser.findElement(pkg.By.cssSelector('button.btn.btn-primary')).click();

new org.openqa.selenium.support.ui.WebDriverWait(WDS.browser, 30000).until(
    org.openqa.selenium.support.ui.ExpectedConditions.alertIsPresent(),
);

WDS.browser
    .switchTo()
    .alert()
    .accept();

WDS.sampleResult.sampleEnd();

patientAddress,age,gender,totalBilirubin,directBilirubin,alkalinePhosphotase,alamineAminotransferase,totalProteins,albumin,albuminGlobulinRatio,doctorAddress,doctorKey