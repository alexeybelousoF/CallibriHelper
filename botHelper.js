//botHelper.js

// Функция поиска слов
function IndexOfAll (messageList, neededArray) {
    var needed = false;
    var newArrayROFL = []

    neededArray.forEach((item, i) => { newArrayROFL.push(item); }); // JS просто отказывается работать с моим массивом, поэтому делаю так

    newArrayROFL.forEach((item, i) => {

      //console.log(item + ' : ' + messageList.includes(item)); // Вывод результата проверки - для тестов

      if (messageList.includes(item)) {
        needed = true;
      }
    });

    return needed;
}



var helpHtmlMiddle = ': ';
var newLine = '\n';
var helpScript = ["код","скрипт"]; //установка скрипта
var helpCalltracking = ["коллтрекинг", "calltracking", "колтрекер", "настрой", "колтрекинг", "ватс"];//все ссылки по настройке КТ
var helpMetrika = ["метрик", "metrik","яндекс"];//Расхождение и синхра 3
var helpAnalytics = ["googl", "analytics", "гугл","gtm", "pixel","аналитик"];//гтм и GA
var helpRedStrips = ["красн", "рамк"];// красные рамки
var helpAmo = [ "амо", "amo"];//АМО(в статье по б24 нифига нет, поэтому нинада)
var helpApi = ["api", "webhook", "albato", " апи", "вебхук", "альбато"];//АПИ
var helpDocs = ["документ", "акт", "договор"];//документы
var helpBalance = ["баланс", "услуг", "оплат", "тариф", "оплач"];//подключение, пополнение баланса, операции
var helpFacebook = ["facebook", "fb", "фейсбук", "лицокнига", "pixel", "пиксель"];//Все интеграции с ФБ
var helpLeadCatcher = ["ловец", "ловцы","попап","поп-ап", "крючок", "крючки", "popup", "pop-up"];//ловцы
var helpQuiz = ["quiz", "квиз"];//квиз
var helpPhoneChange =  ["подмен", "дентификат", "селект", "настрой"]; //Подмена
var helpUTM =  ["utm", "утм", "метк"]; // УТМ
var helpAlert = ["уведомлени", "оповещени"];//Уведомления
var helpAccess = ["доступ", "админ"];//Доступы
var helpNoreferrer = ["источник"];// нет источника
var helpPriceRate = ["тариф", "сумм", "превышен"];//как подобрать тариф
var helpGraphs = ["график"];
var helpVK = ["vk", "вконтакт"];
var helpTilda = ["tilda", "тильд"];
var helpAccuont = ["фото", "аккаунт"];
var helpFeedbackForm = ["перехват", "отслеж", "заявк"]


// Вынесено в функцию, потому что я плохой джаваскриптизер
function HelpProcedure(messageList, helpAllData) {

  //Дальше идет вывод в после сравнения текста
  if ( IndexOfAll(messageList, helpScript) ) {
    helpAllData = helpAllData + newLine + 'Как установить скрипт'+
    helpHtmlMiddle+'https://callibri.ru/help/ustanovka_skripta_callibri/kak_ustanovit_skript_callibri_napryamuyu_v_kod_sayta';
  }

  if ( IndexOfAll(messageList, helpCalltracking) ) {
    helpAllData = helpAllData + newLine + 'Инструкции, которые вам помогут сделать настройку' + helpHtmlMiddle +
    `https://callibri.ru/help/nastroyka_multitrekinga/poshagovaya_nastroyka_multitrekinga`;
  }

  if ( IndexOfAll(messageList, helpMetrika) ) {
    helpAllData = helpAllData + newLine + 'Какие цели передаем'+
    helpHtmlMiddle +'https://callibri.ru/help/sinhronizatsii_i_api/sinhronizatsiya_s_yandeks_metrikoy';
    helpAllData = helpAllData + newLine + 'Если у вас есть расхождения, проверьте их по нашей статье:'+
    helpHtmlMiddle +'https://callibri.ru/help/reshenie_problem/rashozhdenie_dannyh_s_yandeks_metrikoy';
  }

  if ( IndexOfAll(messageList, helpAnalytics) ) {
    helpAllData = helpAllData + newLine + 'Как провести интеграцию с Google Analytics'+
    helpHtmlMiddle +'https://callibri.ru/help/sinhronizatsii_i_api/sinhronizatsiya_s_google_analytics';
    helpAllData = helpAllData + newLine + 'Как ослеживать события через GTM'+
    helpHtmlMiddle +'https://callibri.ru/help/ustanovka_skripta_callibri/otslezhivanie_sobytiy_cherez_google_tag_manager';
  }

  if ( IndexOfAll(messageList, helpRedStrips) ) {
    helpAllData = helpAllData + newLine + 'Что такое красные рамки, подробно'+ helpHtmlMiddle+
    'https://callibri.ru/help/poleznaya_informatsiya/chto_oznachayut_krasnye_ramki_v_ezhl';
  }

  if ( IndexOfAll(messageList, helpAmo) ) {
    helpAllData = helpAllData + newLine + 'Как провести интеграцию с AMOCRM'+ helpHtmlMiddle+
    'https://callibri.ru/help/sinhronizatsii_i_api/sinhronizatsiya_s_amocrm';
  }

  if ( IndexOfAll(messageList, helpApi) ) {
    helpAllData = helpAllData + newLine + 'Вы можете настроить интеграцию силами ваших разработчиков'+ helpHtmlMiddle+
    `API: https://callibri.ru/help/sinhronizatsii_i_api/kak_vospolzovatsya_api
Вебхуки: https://callibri.ru/help/sinhronizatsii_i_api/kak_nastroit_webhook
Albato: https://callibri.ru/help/sinhronizatsii_i_api/kak_nastroit_integratsiyu_cherez_albato`;
  }

  if ( IndexOfAll(messageList, helpDocs) ) {
    helpAllData = helpAllData + newLine + 'Вся информация по документам тут'+ helpHtmlMiddle+
    'https://callibri.ru/help/dengi_i_dokumenty/voprosy_po_dokumentam';
  }

  if ( IndexOfAll(messageList, helpBalance) ) {
    helpAllData = helpAllData + newLine + 'Как пополнить баланс'+ helpHtmlMiddle+
    `https://callibri.ru/help/dengi_i_dokumenty/kak_oplatit
Как подключить улуги: https://callibri.ru/help/podklyuchit_ili_otklyuchit_uslugu/kak_podklyuchit_uslugu`;
  }

  if ( IndexOfAll(messageList, helpFacebook) ) {
    helpAllData = helpAllData + newLine + 'Как настроить  интеграцию с Facebook'+ helpHtmlMiddle+
    `Facebook Messenger: https://callibri.ru/help/sinhronizatsii_i_api/kak_podklyuchit_facebook
Facebook Lead: https://callibri.ru/help/sinhronizatsii_i_api/integratsiya_s_facebook_lead_ads
Facebook Ads: https://callibri.ru/help/sinhronizatsii_i_api/sinhronizatsiya_s_facebook_ads`;
  }

  if ( IndexOfAll(messageList, helpLeadCatcher) ) {
    helpAllData = helpAllData + newLine + 'Как настроить Ловцы лидов'+ helpHtmlMiddle+
    'https://callibri.ru/help/nastroyka_multichata/nastroyka_lovtsov_lidov_kryuchki_lid_magnity_podmena_kontenta';
  }

  if ( IndexOfAll(messageList, helpQuiz) ) {
    helpAllData = helpAllData + newLine + 'Как настроить КВИЗ'+ helpHtmlMiddle+
    'https://callibri.ru/help/nastroyka_multichata/kak_sozdat_kviz_i_nastroit_ego_rabotu_na_sayte';
  }

  if ( IndexOfAll(messageList, helpPhoneChange) ) {
    helpAllData = helpAllData + newLine + 'Как настроить подмену номера'+
    helpHtmlMiddle+'https://callibri.ru/help/nastroyka_multitrekinga/kak_nastroit_identifikatory';
  }

  if ( IndexOfAll(messageList, helpUTM) ) {
    helpAllData = helpAllData + newLine + 'Как настроить UTM-метки'+
    helpHtmlMiddle+'https://callibri.ru/help/poleznaya_informatsiya/kak_polzovatsya_utm_metkami';
  }

  if ( IndexOfAll(messageList, helpAlert) ) {
    helpAllData = helpAllData + newLine + 'Как настроить уведомления'+
    helpHtmlMiddle+`https://callibri.ru/help/s_chego_nachat/uvedomleniya_1
Как включить Пуш-уведомления: https://callibri.ru/help/poleznaya_informatsiya/kak_vklyuchit_vsplyvayuschie_okna_v_brauzere`;
  }
  if ( IndexOfAll(messageList, helpAccess) ) {
    helpAllData = helpAllData + newLine + 'Вкладка Доступы'+
    helpHtmlMiddle+'https://callibri.ru/help/s_chego_nachat/dostupy_k_proektu';
  }
  if ( IndexOfAll(messageList, helpNoreferrer) ) {
    helpAllData = helpAllData + newLine + 'Подробно о том, почему нет источника у звонка'+
    helpHtmlMiddle+'https://callibri.ru/help/reshenie_problem/u_nekotoryh_obrascheniy_ne_opredelilsya_istochnik';
  }
  if ( IndexOfAll(messageList, helpPriceRate) ) {
    helpAllData = helpAllData + newLine + 'Как подобрать тариф'+
    helpHtmlMiddle+'https://callibri.ru/help/poleznaya_informatsiya/kak_podobrat_optimalnyy_tarif';
  }
  if ( IndexOfAll(messageList, helpGraphs) ) {
    helpAllData = helpAllData + newLine + 'Как пользоваться графиками'+
    helpHtmlMiddle+'https://callibri.ru/help/kak_polzovatsya_servisami/kak_polzovatsya_grafikami';
  }
  if ( IndexOfAll(messageList, helpVK) ) {
    helpAllData = helpAllData + newLine + 'Как настроить интеграцию с VK'+
    helpHtmlMiddle+'https://callibri.ru/help/sinhronizatsii_i_api/kak_podklyuchit_vkontakte';
  }
  if ( IndexOfAll(messageList, helpTilda) ) {
    helpAllData = helpAllData + newLine + 'Как установить скрипт в Тильде'+
    helpHtmlMiddle+'https://callibri.ru/help/ustanovka_skripta_callibri/kak_ustanovit_skript_callibri_na_tilda';
  }
  if ( IndexOfAll(messageList, helpAccuont) ) {
    helpAllData = helpAllData + newLine + 'Как установить скрипт в Тильде'+
    helpHtmlMiddle+'https://callibri.ru/help/s_chego_nachat/nastroyka_lichnogo_akkaunta';
  }
  if ( IndexOfAll(messageList, helpFeedbackForm) ) {
    helpAllData = helpAllData + newLine + 'По условиям партнерской программы настройка и проверка работы проекта лежит на стороне агентства. Однако в случае с перехватчиком форм вам нужно только поставить галочку в поле "включить перехватчик форм" в "Настройки" МультиТрекинг" "Основное". Перехватчик настраивается автоматически.'+
    newLine + newLine + 'После перейдите на сайт (в режиме инкогнито) по условиям подмены и отправьте тестовые заявки. Если заявки отобразились в ЕЖЛ, то перехватчик настроен. Если нет, тогда прошу вас написать в данный тикет, мы настроим формы вручную. Также укажите какие именно формы нужно настроить.';
  }


  return helpAllData;
};
