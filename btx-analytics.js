/* BTX Analytics — Supabase event tracking (REST API, no SDK dependency) */
(function() {
  var URL = 'https://isnuhzfmheggdccfliiw.supabase.co';
  var KEY = 'sb_publishable_cfKqoVTS37_1abjuS4PZmw_hjH54GVi';

  function sid() {
    var s = sessionStorage.getItem('btx_sid');
    if (!s) {
      s = (crypto.randomUUID ? crypto.randomUUID()
             : Date.now().toString(36) + Math.random().toString(36).slice(2));
      sessionStorage.setItem('btx_sid', s);
    }
    return s;
  }

  function post(table, body) {
    fetch(URL + '/rest/v1/' + table, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': KEY,
        'Authorization': 'Bearer ' + KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(Object.assign({ session_id: sid() }, body))
    }).catch(function() {});   /* silent fail — never break UX */
  }

  window.btx = {
    track: function(eventType) { post('events', { event_type: eventType }); },
    saveEmail: function(email) {
      post('email_signups', { email: email });
      post('events', { event_type: 'submit_email' });
    }
  };
})();
