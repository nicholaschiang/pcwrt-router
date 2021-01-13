function refresh_timezone(){$("input[value=filtered]","#timezone-group").prop("checked")?$("#zonename").updatecombo(window.filtered_timezones.map(function(e){return{text:e,value:e}})).val(fv.zonename):$("#zonename").updatecombo(window.all_timezones.map(function(e){return{text:e,value:e}})).val(fv.zonename)}function enable_ssh(){$("#enable-ssh").prop("checked")?($("#enable-sshpwd").prop("disabled",!1),$("#ssh-keys").prop("disabled",!1)):($("#enable-sshpwd").prop("disabled",!0),$("#ssh-keys").prop("disabled",!0))}function enable_ddns(){$("#enable-ddns").prop("checked")?$("#ddns-div").show():$("#ddns-div").hide()}$("#enable-ddns").on("click",function(e){enable_ddns()}),$("[name=reset_override]").on("click",function(e){$(this).prop("checked")&&$("[name=email_password_reset]").prop("checked",!0)}),$("[name=email_password_reset]").on("click",function(e){$("[name=reset_override]").prop("checked")&&!$(this).prop("checked")&&(pcwrt.show_message(window.msgs.warning_title,window.msgs.need_email_password_reset),$(this).prop("checked",!0))}),$(function(){$("#localtime").text(fv.localtime),$("label.required").add_required_mark(window.msgs.required),$("label.control-label[data-hint]").init_hint(),$("select").makecombo(),pcwrt.populate_forms(),fv.ntp_servers&&$.each(fv.ntp_servers,function(e,a){var s=$('<li class="option-list"><span class="list-remove pull-right">&nbsp;</span></li>').append(a);$("#ntp-servers").append(s)}),enable_ddns(),enable_ssh();var a=$("#fetch-timezones");function l(e,a){$.ajax({url:e.data("cancel"),type:"POST",success:function(e){}}),$("#autoflash-modal").modal("hide"),$("#status-modal .modal-title").text(window.msgs.oops),$("#status-modal .modal-body p").text(a),$("#status-modal").modal("show")}pcwrt.fetch_data(a.attr("action"),"",function(e){window.all_timezones=e,$("[name=tz_offset]",a).val((new Date).stdTimezoneOffset()),$("[name=dst]",a).val((new Date).hasDst()),pcwrt.fetch_data(a.attr("action"),a.serialize(),function(e){window.filtered_timezones=e,refresh_timezone()})}),$("#sync-time").on("click",function(e){e.preventDefault(),$.ajax({url:$(this).data("url"),type:"POST",data:[{name:"current_time",value:~~((new Date).getTime()/1e3)}],success:function(e){"success"==e.status&&$("#localtime").text(e.message.current_time)},error:function(e,a,s){console.log("Error: "+s)}})}),window.syncTimer=window.setInterval(function(){$.ajax({url:$("#sync-time").data("url"),success:function(e){"success"==e.status&&$("#localtime").text(e.message.current_time)}})},5e3),$("input","#timezone-group").on("click",function(){refresh_timezone()}),$("#flash-div .btn-file :file").on("fileselect",function(e,a,s){$("#flash-div [name=image-name]").val(s)}),$("#restore-modal .btn-file :file").on("fileselect",function(e,a,s){$("#restore-modal [name=archive-name]").val(s)}),$("#ntp-server").next().on("click",function(){var e=$(this).parent().parent();e.removeClass("has-error").find(".form-control-error").remove();var a=$(this).prev().val();pcwrt.is_valid_hostname(a)?($("#ntp-servers li").each(function(){if($(this).text().trim().toLowerCase()==a.toLowerCase())return a=null,!1}),a?($(this).parent().prev().append('<li class="option-list"><span class="list-remove pull-right">&nbsp;</span>'+a+"</li>"),$(this).prev().val("")):e.addClass("has-error").append('<p class="form-control-error">NTP server already added.</p>')):e.addClass("has-error").append('<p class="form-control-error">Invalid hostname</p>')}),$("#ntp-servers").on("click","span.list-remove",function(){$(this).parent().remove()}),$("form[name=general] button[type=submit]").on("click",function(e){e.preventDefault();var a=$(this).parents("form");pcwrt.submit_form(a,function(){var e=a.serializeArray();return $("#ntp-servers li").each(function(){e.push({name:"ntp_servers",value:$(this).text().trim()})}),e},function(e){pcwrt.apply_changes(e.apply)})}),$("#change-password-btn").on("click",function(e){e.preventDefault(),$("#password-modal").modal("show")}),$("form[name=change-password] button[type=submit]").on("click",function(e){e.preventDefault();var a=$(this).parents("form");pcwrt.submit_form(a,a.serialize(),function(e){$("#password-modal").modal("hide"),$("#status-modal .modal-title").text(window.msgs.success),$("#status-modal .modal-body p").text(e.message),$("#status-modal").modal("show")})}),$("#password-modal").on("hidden.bs.modal",function(e){$(".has-error",$(this)).removeClass("has-error"),$(this).find(".form-control-error").remove()}),$("#enable-ssh").on("click",function(){enable_ssh()}),$("form[name=admin] button[type=submit]").on("click",function(e){e.preventDefault();var a=$(this).parents("form");pcwrt.submit_form(a,a.serialize(),function(e){pcwrt.apply_changes(e.apply)})}),$("form[name=hosts-form] button[type=submit]").on("click",function(e){e.preventDefault();var a=$(this).parents("form");pcwrt.submit_form(a,a.serialize(),function(e){$("#status-modal .modal-title").text(window.msgs.success),$("#status-modal .modal-body p").text(window.msgs.apply_success),$("#status-modal").modal("show")})}),$("#reset-settings").on("click",function(e){window.clearInterval(window.syncTimer),pcwrt.confirm_submit(e,$(this),msgs.reset_settings_title,msgs.reset_settings_message,msgs.resetting,"",function(e){$("<iframe/>",{src:e.reload_url+"?addr="+e.addr}).appendTo("#reloader")})}),$("#restore-backup").on("click",function(e){e.preventDefault(),$("#restore-modal").find(".form-group").removeClass("has-error").end().find(".form-control-error").remove().end().find(".prgs").remove().end().modal("show")}),$("#restore-modal form").ajaxForm({beforeSubmit:function(e,a,s){var t;return $("#restore-modal .form-control-error").parent().removeClass("has-error").end().remove(),!!a[0].archive.value||($("#restore-modal form .form-group:first").addClass("has-error").append('<p class="form-control-error">'+msgs.select_archive+"</p>"),!1)},beforeSend:function(){},uploadProgress:function(e,a,s,t){var o=$("#restore-modal .bar"),n=$("#restore-modal .percent");if(0==o.length){o=$('<div class="bar"></div>'),n=$('<div class="percent"></div>');var r=$('<div class="prgs"></div>');r.append(o),r.append(n),$("#restore-modal .modal-body").append(r)}o.width(t+"%"),n.html(t+"%")},success:function(){$("#restore-modal .bar").width("100%"),$("#restore-modal .percent").html("100%")},complete:function(e){$("#restore-modal").modal("hide");var a=e.responseJSON;"success"==a.status?a.reload_url?(window.clearInterval(window.syncTimer),$("#spinner strong").text(window.msgs.restoring),pcwrt.showOverlay($("#spinner")),$("<iframe/>",{src:a.reload_url+"?addr="+a.addr}).appendTo("#reloader")):a.apply&&pcwrt.apply_changes(a.apply):"login"==a.status?location.reload(!0):($("#status-modal .modal-title").text(window.msgs.oops),$("#status-modal .modal-body p").text(a.message),$("#status-modal").modal("show"))}}),$("#flash-div input[name=update-mode]").on("click",function(){"auto"==$(this).val()?($("#manual-flash").hide(),$("#auto-flash").show()):($("#auto-flash").hide(),$("#manual-flash").show())}),"manual"==$("#flash-div input[name=update-mode]:checked").val()&&($("#auto-flash").hide(),$("#manual-flash").show()),$("form[name=notify-form] button[type=submit]").on("click",function(e){e.preventDefault();var a=$(this).parents("form");pcwrt.submit_form(a,a.serialize(),function(e){$("#status-modal .modal-title").text(window.msgs.success),$("#status-modal .modal-body p").text(e.message),$("#status-modal").modal("show")})}),$("#flash-div form[name=check-update] button[type=submit]").on("click",function(e){e.preventDefault();var a=$(this).parents("form");pcwrt.submit_form(a,{},function(e){var a=e.upgrade_status;a?("upgrade"==a.status?$("#autoflash-modal").find("button[type=submit]").prop("disabled",!1).end().find(".upgrade-available").show().end().find(".no-upgrade-available").hide().end().find(".version-number").text(a.version).end().find(".release-notes").empty().append($("<a>").attr("href",a.release_notes).attr("target","_blank").text(a.release_notes)):($("#autoflash-modal").find(".upgrade-available").hide().end().find(".no-upgrade-available").show(),a.last&&$("#autoflash-modal").find("#rollback-prompt").show().find("span").text(a.last).end().end().find("#rollback-btn").show()),$("#autoflash-modal").modal("show")):($("#status-modal .modal-title").text(window.msgs.oops),$("#status-modal .modal-body p").text(window.msgs.unknown_error),$("#status-modal").modal("show"))},null,!1,window.msgs.check_update)}),$("#flash-div form[name=upload]").ajaxForm({beforeSubmit:function(e,a,s){var t;return $("#flash-div .form-control-error").parent().removeClass("has-error").end().remove(),!!a[0].image.value||($("#flash-div form .form-group:first").addClass("has-error").append('<p class="form-control-error">'+msgs.select_image+"</p>"),!1)},beforeSend:function(){$("#flash-div .bar").width("0%"),$("#flash-div .percent").html("0%")},uploadProgress:function(e,a,s,t){$("#flash-div .prgs").hasClass("hidden")&&$("#flash-div .prgs").removeClass("hidden"),$("#flash-div .bar").width(t+"%"),$("#flash-div .percent").html(t+"%")},success:function(){$("#flash-div .bar").width("100%"),$("#flash-div .percent").html("100%")},complete:function(e){$("#flash-div .prgs").addClass("hidden");var a=e.responseJSON;"success"==a.status?($("#flash-modal").find(".modal-body p").addClass("hidden").end().modal("show"),$("#flash-message-"+a.code).removeClass("hidden"),"md5ok"==a.code||"md5unchecked"==a.code?($("#flash-message-ok").removeClass("hidden"),$("#flash-modal button[type=submit]").show(),$("#flash-modal input[name=keep]").val("1"==a.keep?"1":"0"),"1"==a.keep?$("#flash-message-keep").removeClass("hidden"):$("#flash-message-erase").removeClass("hidden")):$("#flash-modal button[type=submit]").hide()):"login"==a.status?location.reload(!0):($("#status-modal .modal-title").text(window.msgs.oops),$("#status-modal .modal-body p").text(a.message),$("#status-modal").modal("show"))}}),$("#autoflash-modal button[type=submit]").on("click",function(e){e.preventDefault(),$(this).prop("disabled",!0);var r=$(this).parents("form");r.data("canceled",null);var a=[];"rollback-btn"==e.target.id&&a.push({name:"version",value:$("#rollback-prompt span").text()});var s="";pcwrt.submit_form(r,a,function(e){if("start"==e.message){var a=$("#autoflash-modal .bar"),s=$("#autoflash-modal .percent");if(0==a.length){a=$('<div class="bar"></div>'),s=$('<div class="percent"></div>');var t=$('<div class="prgs"></div>');t.append(a),t.append(s),$("#autoflash-modal .modal-body").append(t)}a.width("0%"),s.html("0%");var o=0;function n(){$.ajax({url:r.attr("action"),success:function(e){if("success"==e.message||/^fail/.test(e.message))if("success"!=e.message||r.data("canceled"))3==o?l(r,window.msgs.failed_download):(o+=1,window.setTimeout(n,1e3*o));else{var a=$("#autoflash-modal .bar"),s=$("#autoflash-modal .percent");a.width("100%"),s.html("100%"),$("#spinner strong").html(window.msgs.updating.join("<br><br>")),pcwrt.showOverlay($("#spinner")),pcwrt.submit_form($("#flash-modal form"),{keep:"1"},function(e){$("<iframe/>",{src:e.reload_url+"?addr="+e.addr}).appendTo("#reloader")},null,!0)}else{var a=$("#autoflash-modal .bar"),s=$("#autoflash-modal .percent");a.width(e.message+"%"),s.html(e.message+"%"),r.data("canceled")||window.setTimeout(n,300)}},error:function(){l(r,window.msgs.unknown_error)}})}window.setTimeout(n,300)}else l(r,window.msgs.unknown_error)},null,!0)}),$("#autoflash-modal").on("hide.bs.modal",function(e){$("form",$(this)).data("canceled",!0),$(".prgs",$(this)).remove()}),$("#autoflash-modal button[type=button],#flash-modal button[type=button]").on("click",function(e){e.preventDefault();var a=$(this).parents("form");$.ajax({url:a.data("cancel"),type:"POST",success:function(e){}}),$("#autoflash-modal,#flash-modal").modal("hide")}),$("#flash-modal button[type=submit]").on("click",function(e){e.preventDefault(),window.clearInterval(window.syncTimer);var a=$(this).parents("form");$("#spinner strong").html(window.msgs.updating.join("<br><br>")),pcwrt.showOverlay($("#spinner")),pcwrt.submit_form(a,a.serialize(),function(e){$("<iframe/>",{src:e.reload_url+"?addr="+e.addr}).appendTo("#reloader")},null,!0)})});