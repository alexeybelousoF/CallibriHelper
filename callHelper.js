// callHelper - помощник по звонкам

//Функция добавления фишек ко звонку
function change_call_container() {
  var containers = document.querySelectorAll('.call_container');

  containers.forEach((container, i) => {
    var name = container.getAttribute('name');

        window.addEventListener('storage', function(event) {
            console.log(event);
            try {
                var data = localStorage.getItem(name);
                var call_data = JSON.parse(data);
                if (!call_data) {
                  return false;
                }
                if (call_data.loading) {
                  throw 'Данные не загружены';
                } else {
                  var card = document.createElement('a');
                  card.href = "https://in.callibri.ru/chat/197#" + call_data.result.dialog_id;
                  card.textContent = "Карточка";
                  card.target = "_blank";
                  card.id = "card" + call_data.result.dialog_id;// разметим, чтобы удалить лишнее
                  if (!document.getElementById(card.id)) {
                    document.querySelector('['+name+'] .notice-last-line').innerHTML = document.querySelector('['+name+'] .notice-last-line').innerHTML + card
                    return true; // Прерываем, все ок
                  } else {
                    throw 'уже добавлено';
                  }
                }
            }
            catch(e) {
              console.log(e);
              console.log(call_data);
            }
        });
  });
}


//Функция поиска звонка в кабинете
function waiting_call_container() {
  // выбираем нужный элемент - наблюдать надо за тем элементом, в котором создается контейнер звонка
  var target = document.querySelector('.notices-container');

  // создаем новый экземпляр наблюдателя
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      change_call_container();

      //console.log(mutation);
    });
  });

  // создаем конфигурации для наблюдателя
  var config = { attributes: true, childList: true, characterData: true };

  // запускаем механизм наблюдения
  observer.observe(target,  config);

  // позже, если надо, прекращаем наблюдение
  // observer.disconnect();
}







// Контейнер там такой
// <div class="notice-block call_container" name="src:79667031955"
// id="callContainer_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c" value="84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c"
// data-src="79667031955" data-client_id="197" data-uniqueid="1618498978.7245958"
// data-channel_id="2405" data-channel_name="Поддержка" data-project_name="Callibri_сайт" data-department="undefined"
// data-userfield="undefined" data-session_id="84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c" data-outbound="false"
// style="display: block; background-color: black;">
// <div class="notice notice-outgoing-call">
// <div class="row notice-row"><div class="col-md-2 notice-img">
// <img id="avatar_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c" alt="" src="/system/crm_clients/avatars/003/746/743/original/test.png"></div>
// <div class="col-md-10 notice-info">
// <p class="title-notice"><strong><span id="incoming_dep_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c">accounts</span> </strong>
// <span id="incoming_name_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c">Поддержка</span>:</p>
// <p class="name-notice" id="a-leg-name_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c">Лешка Зло</p>
// <p class="name-group"> &nbsp; </p><p class="notice-last-line">Callibri_сайт
// <span class="phone-number" id="incoming_number_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c">8 966 703 19 55</span>
// </p><p style="display: none;" id="incoming_account_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c"></p></div></div>
// <button type="button" class="call-btn" id="incoming_cancel_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c"></button>
// <button type="button" class="no-sound" id="incoming_sound_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c"></button>
// <button type="button" class="no-mic" id="incoming_mic_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c"></button>
// <button type="button" class="time-call-btn" id="time_call_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c" style="display: none;">00:00</button>
// <button type="button" class="call-btn" id="incoming_hangup_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c" style="display: none;">
// </button><div class="btn-drop"><div class="dropdown">
// <button type="button" class="call-btn-blue" id="incoming_transfer_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c" style="display: none;"></button>
// <ul class="dropdown-menu dropdown-menu-right" id="transfer_list_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c"><li><a href="#">Александра Шестовских</a></li><li><a href="#">Алена Буторина</a></li><li><a href="#">Дмитрий Матлахов</a></li><li><a href="#">Денис Доценко</a></li><li><a href="#">Глеб Ульянов</a></li><li><a href="#">Алексей Белоусов</a></li><li><a href="#">Дмитрий Фоменко</a></li><li><a href="#">Эмиль Перепелица</a></li><li><a href="#">Ростислав Кошик</a></li><li><a href="#">Григорий Первухин</a></li><li><a href="#">Алена Гапонова</a></li><li><a href="#">Анастасия Пшеничная</a></li><li><a href="#">Шах Бобокулов</a></li><li><a href="#">Александра Харлова</a></li><li><a href="#">Виталий Грабовенко</a></li><li><a href="#">Евгений Колчин</a></li><li><a href="#">Варвара Кучевасова</a></li><li><a href="#">Ольга Баронина</a></li><li><a href="#">Алексей Грабовенко</a></li><li><a href="#">Анна Анисина</a></li><li><a href="#">Артем Ткачук</a></li><li><a href="#">Александр Калягин</a></li><li><a href="#">Александр Снатенков</a></li><li><a href="#">Менеджеры</a></li><li><a href="#">Поддержка</a></li><li><a href="#">Партнеры</a></li><li><a href="#">VIP</a></li></ul></div></div><button type="button" class="answer_btn call-number-btn" id="incoming_answer_84923154-189e-123a-6baa-00163e531c7btUNj37at5cH8c"></button></div></div>
//
//
//
// {"loading":false,"result":{"src":"79667031955","client_id":197,"crm_department":"accounts","wait":false,"name":"Лешка Зло","avatar":"/system/crm_clients/avatars/003/746/743/original/test.png","crm_client_id":3746743,"dialog_id":3804043,"dialog_content":{"id":3804043,"entries":{"phone":["79321229498","79667031955","79998889898","238723873298"],"email":["janefan@e1.ru","tes@test.ru","test123@test.ru","test12345@12345test.ru","testteper@test.ru","8999999@test.ru"]},"chat_type":"cdr","closed":false,"complete":false,"data":"[{\"id\":32853513,\"author\":\"user\",\"channel\":null,\"text\":\"{\\\"id\\\":30146480,\\\"duration\\\":\\\"00:29\\\",\\\"callstatus\\\":\\\"NO ANSWER\\\",\\\"call_label\\\":\\\"29 сек. без ответа\\\",\\\"src\\\":\\\"79667031955\\\"}\",\"has_manager\":false,\"created_at\":\"2021-04-15T15:01:29.000Z\",\"updated_at\":\"2021-04-15T15:02:09.000Z\",\"transport\":\"cdr\",\"external_model_id\":30146480,\"author_name\":\"Лешка Зло\",\"avatar_image\":\"/system/crm_clients/avatars/003/746/743/thumb/test.png\",\"author_id\":null,\"is_edit\":false},{\"id\":32853549,\"author\":\"system\",\"channel\":null,\"text\":\"Ростислав Кошик перевел диалог на \\u003Cb\\u003EАлексей Белоусов (it@callibri.ru)\\u003C/b\\u003E\",\"has_manager\":null,\"created_at\":\"2021-04-15T15:02:18.000Z\",\"updated_at\":\"2021-04-15T15:02:18.000Z\",\"transport\":null,\"external_model_id\":null,\"author_name\":null,\"avatar_image\":null,\"author_id\":2,\"is_edit\":false},{\"id\":32853569,\"author\":\"user\",\"channel\":null,\"text\":\"{\\\"id\\\":30146519,\\\"duration\\\":\\\"00:20\\\",\\\"callstatus\\\":\\\"NO ANSWER\\\",\\\"call_label\\\":\\\"20 сек. без ответа\\\",\\\"src\\\":\\\"79667031955\\\"}\",\"has_manager\":false,\"created_at\":\"2021-04-15T15:03:04.000Z\",\"updated_at\":\"2021-04-15T15:05:07.000Z\",\"transport\":\"cdr\",\"external_model_id\":30146519,\"author_name\":\"Лешка Зло\",\"avatar_image\":\"/system/crm_clients/avatars/003/746/743/thumb/test.png\",\"author_id\":null,\"is_edit\":false},{\"id\":32854147,\"author\":\"user\",\"channel\":null,\"text\":\"{\\\"id\\\":30146866,\\\"duration\\\":\\\"00:44\\\",\\\"callstatus\\\":\\\"NO ANSWER\\\",\\\"call_label\\\":\\\"44 сек. без ответа\\\",\\\"src\\\":\\\"79667031955\\\"}\",\"has_manager\":false,\"created_at\":\"2021-04-15T15:21:55.000Z\",\"updated_at\":\"2021-04-15T15:23:18.000Z\",\"transport\":\"cdr\",\"external_model_id\":30146866,\"author_name\":\"Лешка Зло\",\"avatar_image\":\"/system/crm_clients/avatars/003/746/743/thumb/test.png\",\"author_id\":null,\"is_edit\":false},{\"id\":32854230,\"author\":\"user\",\"channel\":null,\"text\":\"{\\\"id\\\":30146905,\\\"duration\\\":\\\"00:07\\\",\\\"callstatus\\\":\\\"ANSWERED\\\",\\\"call_label\\\":\\\"\\\",\\\"src\\\":\\\"79667031955\\\",\\\"to\\\":\\\"Алексей Белоусов\\\",\\\"recognized\\\":true}\",\"has_manager\":false,\"created_at\":\"2021-04-15T15:24:01.000Z\",\"updated_at\":\"2021-04-15T15:24:50.000Z\",\"transport\":\"cdr\",\"external_model_id\":30146905,\"author_name\":\"Лешка Зло\",\"avatar_image\":\"/system/crm_clients/avatars/003/746/743/thumb/test.png\",\"author_id\":null,\"is_edit\":false},{\"id\":32854251,\"author\":\"user\",\"channel\":null,\"text\":\"{\\\"id\\\":30146919,\\\"duration\\\":\\\"00:05\\\",\\\"callstatus\\\":\\\"ANSWERED\\\",\\\"call_label\\\":\\\"\\\",\\\"src\\\":\\\"79667031955\\\",\\\"to\\\":\\\"Алексей Белоусов\\\",\\\"recognized\\\":true}\",\"has_manager\":false,\"created_at\":\"2021-04-15T15:25:03.000Z\",\"updated_at\":\"2021-04-15T15:26:06.000Z\",\"transport\":\"cdr\",\"external_model_id\":30146919,\"author_name\":\"Лешка Зло\",\"avatar_image\":\"/system/crm_clients/avatars/003/746/743/thumb/test.png\",\"author_id\":null,\"is_edit\":false},{\"id\":32854551,\"author\":\"user\",\"channel\":null,\"text\":\"{\\\"from\\\":\\\"79667031955\\\",\\\"unique_id\\\":\\\"1618500957.7247252\\\",\\\"callstatus\\\":\\\"IN PROGRESS\\\",\\\"call_label\\\":\\\"Не завершен\\\",\\\"to\\\":\\\"\\\",\\\"src\\\":\\\"79667031955\\\"}\",\"has_manager\":false,\"created_at\":\"2021-04-15T15:36:17.000Z\",\"updated_at\":\"2021-04-15T15:36:17.000Z\",\"transport\":\"cdr\",\"external_model_id\":null,\"author_name\":\"Лешка Зло\",\"avatar_image\":\"/system/crm_clients/avatars/003/746/743/thumb/test.png\",\"author_id\":null,\"is_edit\":false}]","rating":null,"client_id":197,"channel_ids":{"81321356":3506876,"465738680":1507653,"481778336":1745529,"608888791":2106252,"622909040":2282691,"628829739":2152638,"628847183":2152746,"628886191":2152931,"628894369":2152973,"640392231":2189867,"641462076":2214756,"647075294":2212631,"674629283":2317492},"avialiable_transport":"cdr","last_transport":"cdr"}}}
