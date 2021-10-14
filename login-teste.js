const { Builder, By, Key, until } = require("selenium-webdriver");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

async function criarEvento(driver, qIngres) {
  const nameForme = "Sociedade Alternativa";

  // Quantidade total de ingresso
  const quantIngre = 50;
  const quantPer = 4;
  const ingDataInit = "";
  const ingDataEnd = 1107251111;
  const textComente =
    "Saudade é solidão acompanhada, é quando o amor ainda não foi embora, <br> mas o amado já... Saudade é amar um passado que ainda não passou, é recusar um presente que nos machuca.";

  let valid = true;

  let i = 0;

  while (i < qIngres) {
    if (valid == true) {
      // ->> Criação de Ingresso

      valid = false;

      let launchModal = await driver.wait(
        until.elementLocated(By.linkText("Criar ingresso"))
      );
      launchModal = await driver.wait(until.elementIsVisible(launchModal));
      await launchModal.click();

      let ingressoPago = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-ticket-type/div/div/div/go-selectable-group/div/div[1]"
          )
        )
      );
      ingressoPago = await driver.wait(until.elementIsVisible(ingressoPago));
      await ingressoPago.click();

      driver.sleep(1000);

      let configForm = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[4]/go-accordion/div/div[2]/a"
          )
        )
      );
      configForm = await driver.wait(until.elementIsVisible(configForm));
      await configForm.click();

      driver.sleep(1000);

      // Formularios a ser testados

      configForm = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-ticket-form/div/div/div/div[2]/label"
          )
        )
      );
      configForm = await driver.wait(until.elementIsVisible(configForm));
      await configForm.click();

      // Selecionar formularios

      await configForm
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-ticket-form/div/div/div/div[2]/div/div[3]/label"
          )
        )
        .click();
      await configForm
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-ticket-form/div/div/div/div[2]/div/div[4]/label"
          )
        )
        .click();
      await configForm
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-ticket-form/div/div/div/div[2]/div/div[5]/label"
          )
        )
        .click();

      configForm = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-ticket-form/div/div/div/div[2]/div/a"
          )
        )
      );
      configForm = await driver.wait(until.elementIsVisible(configForm));
      await configForm.click();

      driver.sleep(1000);

      // Ingresso Multiplos formularios

      configForm = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/ngb-modal-window/div/div/div/div/div/div/go-form/form/go-input[1]/div/div/select/option[2]"
          )
        )
      );
      configForm = await driver.wait(until.elementIsVisible(configForm));
      await configForm.click();

      await configForm
        .findElement(
          By.xpath(
            "/html/body/ngb-modal-window/div/div/div/div/div/div/go-form/form/go-input[2]/div/div/input"
          )
        )
        .sendKeys(`Formulario Teste: ${nameForme}`);
      await configForm
        .findElement(
          By.xpath(
            "/html/body/ngb-modal-window/div/div/div/div/div/div/go-form/form/go-input[3]/div/div/input"
          )
        )
        .sendKeys(`Multe Teste: ${nameForme}`);
      await configForm
        .findElement(
          By.xpath(
            "/html/body/ngb-modal-window/div/div/div/div/div/div/go-form/form/go-input[4]/div/div/input"
          )
        )
        .sendKeys(`Multe Teste: ${nameForme}`);
      await configForm
        .findElement(By.xpath('//*[@id="go-modal-primary-button"]'))
        .click();

      // Finaliso configurção do ingresso
      configForm = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-ticket-form/div/div/div/div[2]/go-button/button"
          )
        )
      );
      configForm = await driver.wait(until.elementIsVisible(configForm));
      await configForm.click();

      // Definir informações
      let nomeIngressoEndPrice = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[1]/go-input/div/div/input"
          )
        )
      );
      nomeIngressoEndPrice = await driver.wait(
        until.elementIsVisible(nomeIngressoEndPrice)
      );
      await nomeIngressoEndPrice.sendKeys("Pista", Key.TAB, "2790");

      let allowSaleOn = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[3]/go-accordion/div/div[2]/div/div[1]/label"
          )
        )
      );
      allowSaleOn = await driver.wait(until.elementIsVisible(allowSaleOn));
      await allowSaleOn.click();
      await allowSaleOn
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[3]/go-accordion/div/div[2]/div/div[2]/label"
          )
        )
        .click();

      // await allowSaleOn.findElement(By.xpath(')).click()

      let option = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[5]/go-accordion/div/div[1]/h3"
          )
        )
      );
      option = await driver.wait(until.elementIsVisible(option));
      await option.click();

      await option
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[5]/go-accordion/div/div[2]/div/div[1]/go-input/div/div/input"
          )
        )
        .sendKeys(quantIngre);
      await option
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[5]/go-accordion/div/div[2]/div/div[2]/go-input/div/div/input"
          )
        )
        .sendKeys(quantPer, Key.TAB, ingDataInit, Key.TAB, ingDataEnd);

      await option
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[5]/go-accordion/div/div[2]/div/div[5]/div/go-input/div/textarea"
          )
        )
        .sendKeys(textComente);
      await option
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[2]/div/go-button/button"
          )
        )
        .click();
    } else {
      // ->> Criação de Ingresso

      valid = false;

      let launchModal = await driver.wait(
        until.elementLocated(By.linkText("Criar ingresso"))
      );
      launchModal = await driver.wait(until.elementIsVisible(launchModal));
      await launchModal.click();

      let ingressoPago = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-ticket-type/div/div/div/go-selectable-group/div/div[1]"
          )
        )
      );
      ingressoPago = await driver.wait(until.elementIsVisible(ingressoPago));
      await ingressoPago.click();

      driver.sleep(1000);

      let configForm = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[4]/go-accordion/div/div[2]/a"
          )
        )
      );
      configForm = await driver.wait(until.elementIsVisible(configForm));
      await configForm.click();

      driver.sleep(1000);

      // Formularios a ser testados

      configForm = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-ticket-form/div/div/div/div[2]/label"
          )
        )
      );
      configForm = await driver.wait(until.elementIsVisible(configForm));
      //await configForm.click();

      // Selecionar formularios
      // Telefone
      await configForm.findElement(
        By.xpath(
          "/html/body/app-root/main/event-detail/app-ticket-form/div/div/div/div[2]/div/div[3]/label"
        )
      );
      //.click();
      // Cpf
      await configForm.findElement(
        By.xpath(
          "/html/body/app-root/main/event-detail/app-ticket-form/div/div/div/div[2]/div/div[4]/label"
        )
      );
      //.click();
      await configForm.findElement(
        By.xpath(
          "/html/body/app-root/main/event-detail/app-ticket-form/div/div/div/div[2]/div/div[5]/label"
        )
      );
      //.click();

      configForm = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-ticket-form/div/div/div/div[2]/div/a"
          )
        )
      );
      configForm = await driver.wait(until.elementIsVisible(configForm));
      await configForm.click();

      driver.sleep(1000);

      // Ingresso Multiplos formularios

      configForm = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/ngb-modal-window/div/div/div/div/div/div/go-form/form/go-input[1]/div/div/select/option[2]"
          )
        )
      );
      configForm = await driver.wait(until.elementIsVisible(configForm));
      await configForm.click();

      await configForm
        .findElement(
          By.xpath(
            "/html/body/ngb-modal-window/div/div/div/div/div/div/go-form/form/go-input[2]/div/div/input"
          )
        )
        .sendKeys(`Formulario Teste: ${nameForme}`);
      await configForm
        .findElement(
          By.xpath(
            "/html/body/ngb-modal-window/div/div/div/div/div/div/go-form/form/go-input[3]/div/div/input"
          )
        )
        .sendKeys(`Multe Teste: ${nameForme}`);
      await configForm
        .findElement(
          By.xpath(
            "/html/body/ngb-modal-window/div/div/div/div/div/div/go-form/form/go-input[4]/div/div/input"
          )
        )
        .sendKeys(`Multe Teste: ${nameForme}`);
      await configForm
        .findElement(By.xpath('//*[@id="go-modal-primary-button"]'))
        .click();

      // Finaliso configurção do ingresso
      configForm = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-ticket-form/div/div/div/div[2]/go-button/button"
          )
        )
      );
      configForm = await driver.wait(until.elementIsVisible(configForm));
      await configForm.click();

      // Definir informações
      let nomeIngressoEndPrice = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[1]/go-input/div/div/input"
          )
        )
      );
      nomeIngressoEndPrice = await driver.wait(
        until.elementIsVisible(nomeIngressoEndPrice)
      );
      await nomeIngressoEndPrice.sendKeys("Pista", Key.TAB, "2790");

      let allowSaleOn = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[3]/go-accordion/div/div[2]/div/div[1]/label"
          )
        )
      );
      allowSaleOn = await driver.wait(until.elementIsVisible(allowSaleOn));
      await allowSaleOn.click();
      await allowSaleOn
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[3]/go-accordion/div/div[2]/div/div[2]/label"
          )
        )
        .click();

      // await allowSaleOn.findElement(By.xpath(')).click()

      let option = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[5]/go-accordion/div/div[1]/h3"
          )
        )
      );
      option = await driver.wait(until.elementIsVisible(option));
      await option.click();

      await option
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[5]/go-accordion/div/div[2]/div/div[1]/go-input/div/div/input"
          )
        )
        .sendKeys(quantIngre);
      await option
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[5]/go-accordion/div/div[2]/div/div[2]/go-input/div/div/input"
          )
        )
        .sendKeys(quantPer, Key.TAB, ingDataInit, Key.TAB, ingDataEnd);

      await option
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[1]/div[5]/go-accordion/div/div[2]/div/div[5]/div/go-input/div/textarea"
          )
        )
        .sendKeys(textComente);
      await option
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-edit-ticket/div/div/div[2]/go-form/form/div[2]/div/go-button/button"
          )
        )
        .click();
    }
    i++;
  }
}

async function criarUser(name, email, cpf, senha, url, idEvent) {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // http://159.203.184.165/conta'
    // Navigate to Url

    const cpfUser = cpf;

    await driver.get(`http://${url}/conta`);

    await driver.findElement(By.partialLinkText("Criar conta")).click();
    await driver.findElement(By.id("name")).sendKeys(`${name}`);
    await driver.findElement(By.id("email")).sendKeys(`${email}`);
    await driver.findElement(By.id("password")).sendKeys(`${senha}`, Key.ENTER);

    // ->> Criação de Evento
    let createEvent = await driver.wait(
      until.elementLocated(By.partialLinkText("Criar evento"))
    );
    createEvent = await driver.wait(until.elementIsVisible(createEvent));
    await createEvent.click();

    //await driver.sleep(3000)

    let nameEvent = await driver.wait(
      until.elementLocated(
        By.css(
          'input[tabindex="1"][class="form-control form-control-lg text-input ng-untouched ng-pristine ng-valid"]'
        )
      )
    );
    nameEvent = await driver.wait(until.elementIsVisible(nameEvent));
    await nameEvent.sendKeys("Hora de Estrela");

    driver
      .findElement(By.css('input[type="tel"]'))
      .sendKeys("30071012300", Key.TAB, "3007251230");

    driver.findElement(By.css(`option[value="${idEvent}"]`)).click();

    await driver
      .findElement(
        By.xpath(
          "/html/body/app-root/main/event-create/div/div/div/go-form/form/div[3]/div/go-button/button"
        )
      )
      .click();

    criarEvento(driver, 5);

    //driver.quit();
  } catch (error) {
    console.log(error);
  }
}

async function loginUser(email, senha, url) {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get(`http://${url}/conta`);
    await driver
      .findElement(By.partialLinkText("Entrar na minha conta"))
      .click();
    await driver
      .findElement(By.css('input[type="email"]'))
      .sendKeys(`${email}`);
    await driver
      .findElement(By.css('input[type="password"]'))
      .sendKeys(`${senha}`, Key.ENTER);
  } catch (erro) {
    console.log(erro);
  }
}

//loginUser('natan.danilo@gmail.com','hunterxhunter','159.203.184.165')

criarUser(
  "Nata Relva",
  `natan.${getRandomInt(0, 1000)}@gmail.com`,
  11174235497,
  "hunterxhunter",
  "159.203.184.165",
  "4"
);
