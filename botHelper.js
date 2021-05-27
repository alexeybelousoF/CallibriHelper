//botHelper.js

// Функция поиска слов
function IndexOfAll (messageList, neededArray) {
    var needed = false;
    var newArrayROFL = []

    neededArray.forEach((item, i) => { newArrayROFL.push(item); }); // JS просто отказывается работать с моим объектом, поэтому делаю так
    newArrayROFL.forEach((item, i) => {
      //console.log(item + ' : ' + messageList.includes(item)); // Вывод результата проверки - для тестов
      if (messageList.includes(item)) {
        needed = true;
      }
    });
    return needed;
}
let _botHelper = {     // объект
  script: {
    0: ["код","скрипт"],
    1: 'Как установить скрипт: https://callibri.ru/help/ustanovka_skripta_callibri/kak_ustanovit_skript_callibri_napryamuyu_v_kod_sayta'},
  calltracking: {
    0: ["коллтрекинг", "calltracking", "колтрекер", "колтрекинг", "ватс"],
    1: 'Инструкции, которые вам помогут сделать настройку: https://callibri.ru/help/nastroyka_multitrekinga/poshagovaya_nastroyka_multitrekinga'},
  metrika: {
    0: ["метрик", "metrik", "яндекс"],
    1: 'Какие цели передаем: https://callibri.ru/help/sinhronizatsii_i_api/sinhronizatsiya_s_yandeks_metrikoy\n Если у вас есть расхождения, проверьте их по нашей статье:  https://callibri.ru/help/reshenie_problem/rashozhdenie_dannyh_s_yandeks_metrikoy'},
  analytics: {
    0: ["googl", "analytics", "гугл", "gtm", "pixel","аналитик"],
    1: 'Как провести интеграцию с Google Analytics: https://callibri.ru/help/sinhronizatsii_i_api/sinhronizatsiya_s_google_analytics\n Как ослеживать события через GTM: https://callibri.ru/help/ustanovka_skripta_callibri/otslezhivanie_sobytiy_cherez_google_tag_manager'},
  redstrips: {
    0: ["красн", "рамк"],
    1: 'Что такое красные рамки, подробно: https://callibri.ru/help/poleznaya_informatsiya/chto_oznachayut_krasnye_ramki_v_ezhl'},
  amocrm: {
    0: [ "амо", "amo"],
    1: 'Как провести интеграцию с AMOCRM: https://callibri.ru/help/sinhronizatsii_i_api/sinhronizatsiya_s_amocrm'},
  api: {
    0: ["api", "webhook", "albato", " апи", "вебхук", "альбато"],
    1: 'Вы можете настроить интеграцию силами ваших разработчиков: API: https://callibri.ru/help/sinhronizatsii_i_api/kak_vospolzovatsya_api\n Вебхуки: https://callibri.ru/help/sinhronizatsii_i_api/kak_nastroit_webhook\n Albato: https://callibri.ru/help/sinhronizatsii_i_api/kak_nastroit_integratsiyu_cherez_albato'},
  docs: {
    0: ["документ", "акт", "договор"],
    1: 'Вся информация по документам тут: https://callibri.ru/help/dengi_i_dokumenty/voprosy_po_dokumentam'},
  balance: {
    0: ["баланс", "услуг", "оплат", "тариф", "оплач"],
    1: 'Как пополнить баланс: https://callibri.ru/help/dengi_i_dokumenty/kak_oplatit\n Как подключить улуги: https://callibri.ru/help/podklyuchit_ili_otklyuchit_uslugu/kak_podklyuchit_uslugu'},
  facebook: {
    0: ["facebook", "fb", "фейсбук", "лицокнига", "pixel", "пиксель"],
    1: 'Как настроить  интеграцию с Facebook:\n Facebook Messenger: https://callibri.ru/help/sinhronizatsii_i_api/kak_podklyuchit_facebook\n Facebook Lead: https://callibri.ru/help/sinhronizatsii_i_api/integratsiya_s_facebook_lead_ads\n Facebook Ads: https://callibri.ru/help/sinhronizatsii_i_api/sinhronizatsiya_s_facebook_ads'},
  leadcatcher: {
    0: ["ловец", "ловцы","попап","поп-ап", "крючок", "крючки", "popup", "pop-up"],
    1: 'Как настроить Ловцы лидов: https://callibri.ru/help/nastroyka_multichata/nastroyka_lovtsov_lidov_kryuchki_lid_magnity_podmena_kontenta'},
  quiz: {
    0: ["quiz", "квиз"],
    1: 'Как настроить КВИЗ: https://callibri.ru/help/nastroyka_multichata/kak_sozdat_kviz_i_nastroit_ego_rabotu_na_sayte'},
  phonechange: {
    0: ["подмен", "дентификат", "селект", "настрой"],
    1: 'Как настроить подмену номера: https://callibri.ru/help/nastroyka_multitrekinga/kak_nastroit_identifikatory'},
  utm: {
    0: ["utm", "утм", "метк"],
    1: 'Как настроить UTM метки: https://callibri.ru/help/poleznaya_informatsiya/kak_polzovatsya_utm_metkami'},
  alerts: {
    0: ["уведомлени", "оповещени"],
    1: 'Как настроить уведомления: https://callibri.ru/help/s_chego_nachat/uvedomleniya_1\nКак включить Пуш-уведомления: https://callibri.ru/help/poleznaya_informatsiya/kak_vklyuchit_vsplyvayuschie_okna_v_brauzere'},
  access: {
    0: ["доступ", "админ"],
    1: 'Как предоставить доступ и сменить администратора проекта: https://callibri.ru/help/s_chego_nachat/dostupy_k_proektu'},
  noreferrer: {
    0: ["источник"],
    1: 'Подробно о том, почему нет источника у звонка: https://callibri.ru/help/reshenie_problem/u_nekotoryh_obrascheniy_ne_opredelilsya_istochnik'},
  price: {
    0: ["тариф", "сумм", "превышен"],
    1: 'Как подобрать тариф: https://callibri.ru/help/poleznaya_informatsiya/kak_podobrat_optimalnyy_tarif'},
  graphs: {
    0: ["график"],
    1: 'Как пользоваться графиками: https://callibri.ru/help/kak_polzovatsya_servisami/kak_polzovatsya_grafikami'},
  vk: {
    0: ["vk", "вконтакт"],
    1: 'Как настроить интеграцию с VK: https://callibri.ru/help/sinhronizatsii_i_api/kak_podklyuchit_vkontakte'},
  tilda: {
    0: ["tilda", "тильд"],
    1: 'Как установить скрипт в Тильде: https://callibri.ru/help/ustanovka_skripta_callibri/kak_ustanovit_skript_callibri_na_tilda'},
  accuont: {
    0: ["фото", "аккаунт"],
    1: 'Настройки аккаунта: https://callibri.ru/help/s_chego_nachat/nastroyka_lichnogo_akkaunta'},
  formcatcher: {
    0: ["перехват", "заявк"],
    1: 'Перехватчик форм вам нужно только включить, а для этого поставить галочку в поле "включить перехватчик форм" в "Настройки" МультиТрекинг" "Основное". Перехватчик настраивается автоматически.\nПосле перейдите на сайт (в режиме инкогнито) по условиям подмены и отправьте тестовые заявки. Если заявки отобразились в ЕЖЛ, то перехватчик настроен. Если нет, тогда прошу вас написать нам, и мы настроим формы вручную. Также укажите какие именно формы нужно настроить.'},
  call_link: {
    0: ["запись", "слушать"],
    1: 'На загрузку записи звонка всегда уходит какое-то время. Обычно на это уходит от 15 до 40 минут. После этого запись становится доступна для прослушивания'
  }
};

var helpHtmlMiddle = ': ';
var newLine = '\n';

// Вынесено в функцию, потому что я плохой джаваскриптизер
function HelpProcedure(messageList) {
  for (key in _botHelper) {
    botkey = _botHelper[key];
    var helpAllData = '';
    if ( IndexOfAll(messageList, botkey[0]) ) {
      if (helpAllData.length > 100) {
        helpAllData = '';
        //console.log('-- Data clear --');
      }
      helpAllData = helpAllData + botkey[1] +'\n';
      //console.log(key + ' added' );
    }
  }
  return helpAllData;
};
