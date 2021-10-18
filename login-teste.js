const { Builder, By, Key, until } = require("selenium-webdriver");

const fs = require("fs");

const getRandomUserName = () => {
  var listName = [""];
  var file = "./name.csv";
  var content = fs.readFileSync(file, "utf8");

  var Papa = require("papaparse");

  Papa.parse(content, {
    header: false,
    delimiter: "\t",
    complete: function (results) {
      rows = results.data;
      listName = rows;
    },
  });
  let nome = listName[getRandomInt(1, 10000)][0];
  return nome;
};

const getRandomLocal = () => {
  var listName = [""];
  var file = "./municipio.csv";
  var content = fs.readFileSync(file, "utf8");

  var Papa = require("papaparse");

  Papa.parse(content, {
    header: false,
    delimiter: "\t",
    complete: function (results) {
      rows = results.data;
      listName = rows;
    },
  });
  return listName[getRandomInt(1, 5500)][0];
};

const getRandomEmail = () => {
  let nome = getRandomUserName();
  let local = getRandomLocal();
  let result = `natalia.${nome.toLocaleLowerCase()}${local.toLocaleLowerCase()}`;
  result = result.normalize("NFD").replace(/[^a-zA-Zs]/g, "");
  return result + "@gmail.com";
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

async function criarEvento(driver, qIngres, idEvent) {
  const nameForme = "Sociedade Alternativa";

  // Quantidade total de ingresso
  const quantIngre = 50;
  const quantPer = 4;
  const ingDataInit = "";
  const ingDataEnd = 1107251111;
  const textComente =
    "Saudade é solidão acompanhada, é quando o amor ainda não foi embora, <br> mas o amado já... Saudade é amar um passado que ainda não passou, é recusar um presente que nos machuca.";

  const describ =
    "O ano de 2020 foi de grandes percas para o universo da música eletrônica, diversos eventos precisaram ser cancelados e outros adiados. Entretanto, o ano seguinte vem com a proposta de trazer diversas festas de grande nome e buscam a atenção do público para fechar a agenda, principalmente do primeiro semestre dos eventos de Música Eletrônica em 2021. Do low ao High BPM nessa lista você poderá conferir alguns dos eventos que estão agendados para ocorrer em 2021, caso tenha a sugestão de algum outro você poderá nos indicar no campo de comentários. Esperemos que ano que vem as grandes festas já possam ocorrer e os eventos de música eletrônica em 2021 estejam garantidos, queremos estar juntos de vocês em alguns dessa lista.";

  // Criãção de quantidade qIngres de ingressos

  // ->> Criação de Evento
  let createEvent = await driver.wait(
    until.elementLocated(
      By.xpath("/html/body/app-root/app-header/header/nav/ul/li[4]/a/button")
    )
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
  await nameEvent.sendKeys(`${getRandomUserName()} em ${getRandomLocal()}`);

  driver
    .findElement(By.css('input[type="tel"]'))
    .sendKeys("30071012300", Key.TAB, "3007251230");

  driver.findElement(By.css(`option[value="4"]`)).click();

  driver
    .findElement(
      By.xpath(
        "/html/body/app-root/main/event-create/div/div/div/go-form/form/div[1]/div[5]/go-input/div/div/input"
      )
    )
    .sendKeys("Natã");
  driver
    .findElement(
      By.xpath(
        "/html/body/app-root/main/event-create/div/div/div/go-form/form/div[1]/div[6]/go-input/div/div/input"
      )
    )
    .sendKeys("natan.danilo@gmail.com");

  await driver
    .findElement(
      By.xpath(
        "/html/body/app-root/main/event-create/div/div/div/go-form/form/div[3]/div/go-button/button"
      )
    )
    .click();

  let i = 0;
  while (i < qIngres) {
    // ->> Criação de Ingresso

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
    i++;
  }

  // Adicionar descrição
  let desc = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/app-root/main/event-detail/div[1]/div[3]/div/div/div[2]/p/a"
      )
    )
  );
  desc = await driver.wait(until.elementIsVisible(desc));
  desc.click();

  desc = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/app-root/main/event-detail/app-event-edit-description/div[1]/div/div[2]/div/go-input/div/textarea"
      )
    )
  );
  desc = await driver.wait(until.elementIsVisible(desc)).sendKeys(describ);
  desc = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/app-root/main/event-detail/app-event-edit-description/div[2]/div/div/div/go-button/button"
      )
    )
  );
  desc = await driver.wait(until.elementIsVisible(desc));
  desc.click();
  // --> FINAL DA DESCRIÇÃO

  // --> Cadastro Local ou Definir Eventos Online

  let localEvent = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/app-root/main/event-detail/div[1]/div[3]/div/div/div[3]/button"
      )
    )
  );
  localEvent = await driver.wait(until.elementIsVisible(localEvent));
  localEvent.click();

  // Presencial
  let presencial = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/app-root/main/event-detail/app-event-place-type/div/div/div/go-selectable-group/div/div[1]/go-card-select/div/div/h3"
      )
    )
  );
  presencial = await driver.wait(until.elementIsVisible(presencial));
  presencial.click();

  // local
  try {
    onde = getRandomLocal();
    let local = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/app-root/main/event-detail/app-event-add-place/div/div/div[2]/span/go-form/form/go-input/div/div/input"
        )
      )
    );
    local = await driver.wait(until.elementIsVisible(local));
    await local.sendKeys(onde, Key.ENTER);
    await driver.sleep(2000);
    local = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/app-root/main/event-detail/app-event-add-place/div/div/div[2]/div/div[2]"
        )
      )
    );
    local = await driver.wait(until.elementIsVisible(local));
    await driver.sleep(1000);
    local.click();
  } catch (error) {
    if (error) {
      local = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-add-place-manual/div/div/div[2]/go-form/form/div[1]/div[1]/go-input/div/div/input"
          )
        )
      );
      local = await driver.wait(until.elementIsVisible(local));
      local.sendKeys(
        "Minha Casa",
        Key.TAB,
        "Rua Francisco Dantas de Medeiros",
        Key.TAB,
        "431",
        "Canutos",
        Key.TAB,
        "Caicó"
      );
      local
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-add-place-manual/div/div/div[2]/go-form/form/div[1]/div[6]/go-input/div/div/select/option[21]"
          )
        )
        .click();
      local
        .findElement(
          By.xpath(
            "/html/body/app-root/main/event-detail/app-event-add-place-manual/div/div/div[2]/go-form/form/div[2]/div/go-button/button"
          )
        )
        .click();
    }
  }

  // --> FINAL DE DECLARAR ENVENTO

  driver.sleep(2000);

  // Publicar Evento

  let publicar = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/app-root/main/event-detail/div[1]/div[3]/div/div/go-button[1]/button"
      )
    )
  );
  publicar = await driver.wait(until.elementIsVisible(publicar));
  await publicar.click();

  driver.sleep(3000);

  // Metodo de recebimento

  let banco = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/app-root/main/event-detail/app-receiving-sales-type/div/div/div/go-selectable-group/div/div[2]/go-card-select/div"
      )
    )
  );
  banco = await driver.wait(until.elementIsVisible(banco));
  banco.click();
  console.log("Metodo de rebimento informado");

  driver.sleep(2000);

  //--> Nome do Banco
  let contaBancaria = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/app-root/main/event-detail/app-bank-account/div/div/div[2]/go-form/form/div[1]/div[1]/go-input/div/div/select"
      )
    )
  );
  contaBancaria = await driver.wait(until.elementIsVisible(contaBancaria));
  contaBancaria
    .findElement(
      By.xpath(
        "/html/body/app-root/main/event-detail/app-bank-account/div/div/div[2]/go-form/form/div[1]/div[1]/go-input/div/div/select/option[2]"
      )
    )
    .click();
  console.log("Primeiro banco de aparecer");

  contaBancaria
    .findElement(
      By.xpath(
        "/html/body/app-root/main/event-detail/app-bank-account/div/div/div[2]/go-form/form/div[1]/div[2]/go-input/div/div/select/option[1]"
      )
    )
    .click();

  await contaBancaria
    .findElement(
      By.xpath(
        "/html/body/app-root/main/event-detail/app-bank-account/div/div/div[2]/go-form/form/div[1]/div[3]/go-input/div/div/input"
      )
    )
    .sendKeys(
      1668,
      Key.TAB,
      529630,
      Key.TAB,
      "Nata Johnatan Danilo Relva Brito",
      Key.TAB,
      "11174235497"
    );
  await contaBancaria
    .findElement(
      By.xpath(
        "/html/body/app-root/main/event-detail/app-bank-account/div/div/div[2]/go-form/form/div[2]/div/go-button/button"
      )
    )
    .click();

  let selecionarConta = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/app-root/main/event-detail/app-event-payment-accounts/div[1]/div/div[2]/go-selectable-group/go-card-select[1]/div"
      )
    )
  );
  selecionarConta = await driver.wait(until.elementIsVisible(selecionarConta));
  await driver.sleep(1000);
  await selecionarConta.click();
  console.log("Conta Selecionada");

  await driver.sleep(1000);

  let nextConta = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/app-root/main/event-detail/app-event-payment-accounts/div[2]/div/div/div/go-button/button"
      )
    )
  );
  nextConta = await driver.wait(until.elementIsVisible(nextConta));
  nextConta.click();

  let concluir = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/ngb-modal-window/div/div/app-modal-event-link/go-button/button"
      )
    )
  );
  concluir = await driver.wait(until.elementIsVisible(concluir));
  concluir.click();

  driver.sleep(4000);

  let iconX = await driver.wait(
    until.elementLocated(
      By.xpath("/html/body/app-root/main/event-detail/div[4]/button/i")
    )
  );
  iconX = await driver.wait(until.elementIsVisible(iconX));
  iconX.click();

  console.log("Evento Criado");

  await driver.sleep(5000);

  //->> Parabén vc terminou de realizar o evento
}

async function criarUser(name, email, cpf, senha, url, idEvent, quantEvent) {
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

    let event = 0;
    while (event < quantEvent) {
      await criarEvento(driver, 1, idEvent);
      event++;
    }

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

async function criarUserEvento() {
  const quantEvent = 10;
  criarUser(
    getRandomUserName() + " " + getRandomLocal(),
    getRandomEmail(),
    11174235497,
    "hunterxhunter",
    "159.203.184.165",
    "4",
    quantEvent
  );
}

criarUserEvento();

//console.log(getRandomEmail());
