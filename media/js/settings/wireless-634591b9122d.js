function macfilter_change(e){var a=e.val(),t=e.parents("div.form-group:first").next();"disable"==a?t.slideUp():("allow"==a?($(".allow-macaddr",t).removeClass("hidden"),$(".deny-macaddr",t).addClass("hidden")):($(".allow-macaddr",t).addClass("hidden"),$(".deny-macaddr",t).removeClass("hidden")),t.slideDown())}function encryption_change(e){var a=e.val();null==a||"none"==a?e.parents("div.form-group:first").next().slideUp().next().slideUp():e.parents("div.form-group:first").next().slideDown().next().slideDown()}function adjustModalBackDrop(){var e=$("#calendar-dialog .modal-backdrop").height(),a=$("#calendar-dialog .modal-dialog").height()+150;$("#calendar-dialog .modal-backdrop").height(a<e?e:a)}function wifi_schedule_change(){var e;"1"==$("input[name=alwayson-chk]:checked").val()?($("#calendar-container").slideUp(),$("#extend-time").slideUp(),$("#extend-time-alert").slideUp()):($("#extend-time").slideDown(),$("#extend-time-alert").data("extended")&&$("#extend-time-alert").slideDown(),$("#calendar-container").slideDown(400,function(){$("#calendar-tabs a:first").trigger("shown.bs.tab"),adjustModalBackDrop()}))}function create_overlay(e,a){var t=$("tr:eq(1) td:eq("+a+")",e),i=$("tr:last td:last",e);$c=$("<div/>",{class:"ts-container"}).css({position:"absolute",top:t.position().top+e.position().top+parseInt(e.css("margin-top"))+1,left:t.position().left+e.position().left+1,width:t.width(),height:"1440px","background-color":"transparent","z-index":0}).data("day",a-1),e.after($c)}function copy_macfilter_to_other_bands(e){e.siblings().each(function(){$("[name=macfilter]",$(this)).val($("[name=macfilter]",e).val()),$(".maclist-ul",$(this)).html($(".maclist-ul",e).html()),macfilter_change($("select[name=macfilter]",$(this)))})}function initialize_calendar(){for(var e=["12 <sup>am</sup>","1 <sup>am</sup>","2 <sup>am</sup>","3 <sup>am</sup>","4 <sup>am</sup>","5 <sup>am</sup>","6 <sup>am</sup>","7 <sup>am</sup>","8 <sup>am</sup>","9 <sup>am</sup>","10 <sup>am</sup>","11 <sup>am</sup>","12 <sup>pm</sup>","1 <sup>pm</sup>","2 <sup>pm</sup>","3 <sup>pm</sup>","4 <sup>pm</sup>","5 <sup>pm</sup>","6 <sup>pm</sup>","7 <sup>pm</sup>","8 <sup>pm</sup>","9 <sup>pm</sup>","10 <sup>pm</sup>","11 <sup>pm</sup>"],a=$("#graphic-calendar"),t=0;t<e.length;t++)$('<tr><td rowspan="2">'+e[t]+"</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>").appendTo(a),$('<tr class="odd"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>').appendTo(a);$("tr:first td:first",a).css({"border-top":"1px solid transparent","border-left":"1px solid transparent"}),$("td",a).outerHeight(30),$("tr:first td",a).outerHeight(51),$("tr:last td",a).outerHeight(31),$("#text-calendar tr:first td").outerHeight(51);var i=[];fv.schedule&&"object"==typeof fv.schedule&&$.each(fv.schedule,function(e,a){$("#text-calendar tr:eq(1) td:eq("+e+") textarea").val(a),i[e]=a}),$("#calendar-dialog").data("schedule",i),$("#extend-time-alert").data("extended")&&$("#extend-time-alert").show()}function add_options(t,e){$.each(e,function(e,a){t.append($("<option/>").attr("value",a.value).text(a.text))})}$("input[name=alwayson-chk]").on("click",function(){wifi_schedule_change()}),$("#wifi-calendar").on("click",function(e){e.preventDefault(),e.stopPropagation(),$("#calendar-dialog").modal({keyboard:!1,backdrop:"static"}).modal("show"),$("[name=alwayson-chk]").each(function(){if($(this).val()==$("[name=alwayson]").val())return $(this).prop("checked",!0),!1}),"0"==$("[name=alwayson]").val()?($("#extend-time").show(),$("#extend-time-alert").data("extended")&&$("#extend-time-alert").show(),$("#calendar-container").show()):($("#extend-time").hide(),$("#extend-time-alert").hide(),$("#calendar-container").hide()),$("#calendar-tabs a:first").tab("show"),$("#calendar-tabs a:first").trigger("shown.bs.tab"),adjustModalBackDrop()}),$('#calendar-dialog a[data-toggle="tab"]').on("shown.bs.tab",function(e){var a;if("#calendar-graphic-input"==e.target.hash){$(".ts-container").remove();var t=$("#graphic-calendar");if(!t.is(":visible"))return;for(var i=1;i<=7;i++)create_overlay(t,i);var s=[];$("#text-calendar tr:eq(1) textarea").each(function(){var n=[];$(this).val().replace(/(\d?\d:\d?\d ?(?:am|pm)) ?- ?(\d?\d:\d?\d ?(?:am|pm))/g,function(e,a,t){var i=pcwrt.time2pixel(a),s=pcwrt.time2pixel(t);return 0==s&&(s=$(".ts-container").height()),n.push([i,s]),e}),s.push(n)}),$(".ts-container").sort(function(e,a){return $(e).data("day")-$(a).data("day")}).addRangeSelect("#5bc0de",function(e){return pcwrt.pixel2time(e,$(".ts-container").height())},s)}}),$('#calendar-dialog a[data-toggle="tab"]').on("show.bs.tab",function(e){var a;"#calendar-text-input"==e.target.hash&&$(".ts-container").each(function(){var s="";$(".slider",$(this)).sort(function(e,a){return $(e).position().top-$(a).position().top}).each(function(){var e=$(this).position().top+10,a=pcwrt.pixel2time(e);a.length<8&&(a="0"+a);var t=pcwrt.pixel2time(e+$(".spacer",$(this)).height());t.length<8&&(t="0"+t);var i=a+" - "+t;s=s?s+"\n"+i:i}),$("#text-calendar tr:eq(1) td:eq("+$(this).data("day")+") textarea").val(s)})}),$("#wireless-settings>form>.nav-tabs").on("shown.bs.tab","a",function(){var e=$(this).parent().index(),a=$("#wireless-settings>form>>.tab-pane:eq("+e+")");$(".wireless-settings",a).is(":visible")||$('#wireless-update button[type="submit"]').data("calendar-updated")?$('#wireless-update button[type="submit"]').show():$('#wireless-update button[type="submit"]').hide()}),$("#wireless-settings>form>.nav-tabs").on("hide.bs.tab","a",function(){var e;$("#wireless-settings [name=onefilter]").prop("checked")&&copy_macfilter_to_other_bands($("#wireless-settings>form>.tab-content>.tab-pane:eq("+$(this).parent().index()+")"))}),$("#wireless-settings").on("click","[name=onefilter]",function(e){$(this).prop("checked")?$("#wireless-settings [name=onefilter]").prop("checked",!0):$("#wireless-settings [name=onefilter]").prop("checked",!1)}),$("#calendar-dialog button").on("click",function(){if($(this).hasClass("save")){$("#calendar-graphic-input").is(":visible")&&$('#calendar-tabs [href="#calendar-text-input"]').trigger("show.bs.tab"),$("[name=alwayson]").val($("[name=alwayson-chk]:checked").val());var e=[];$("#text-calendar tr:eq(1) textarea").each(function(){e[$(this).parent().index()]=$(this).val()}),$("#calendar-dialog").data("schedule",e),$('#wireless-update button[type="submit"]').data("calendar-updated",!0).show()}$("#calendar-dialog").modal("hide")}),$(function(){for(var e=1;e<fv.devices.length;e++){var a=$("#wireless-settings>form>.nav-tabs>li:first").clone();a.removeClass("active"),$("#wireless-settings>form>.nav-tabs").append(a);var t=$("#wireless-settings>form>.tab-content>div:first").clone();t.removeClass("in active"),$("#wireless-settings>form>.tab-content").append(t)}1<fv.devices.length&&($("#wireless-settings>form>.nav-tabs").show(),$("#wireless-settings .onefilter").show());var d=0;$.each(fv.devices,function(s,n){var r=$("#wireless-settings>form").find(">.nav-tabs>li:eq("+s+") a").attr("href","#"+n.band.replace(/[^0-9a-zA-Z]/g,"-")+e).attr("aria-controls",n.band).text(n.band).end().find(">.tab-content>.tab-pane:eq("+s+")").attr("id",n.band.replace(/[^0-9a-zA-Z]/g,"-")+e);n.disabled?($(".enable-disable",r).addClass("alert-danger").removeClass("alert-success"),$(".wireless-status",r).text(window.msgs.disabled),$(".enable-wireless",r).removeClass("hidden")):($(".enable-disable",r).removeClass("alert-danger").addClass("alert-success"),$(".wireless-status",r).text(window.msgs.enabled),$(".wifi-control-buttons",r).removeClass("hidden"),$(".wireless-settings",r).show()),$(".enable-wireless",r).on("click",function(e){e.preventDefault(),r.data("disabled",!1),$(".enable-disable",r).addClass("hidden"),$(".enable-alert",r).removeClass("hidden"),$(".wireless-settings",r).show(),$('#wireless-update button[type="submit"]').show()}),r.data("name",n[".name"]),r.data("disabled",n.disabled),$(".disable-wireless",r).on("click",function(e){e.preventDefault();var a=$(this).parents("form");pcwrt.submit_form(a,{devname:r.data("name"),disabled:!0},function(e){$(".wireless-status",r).text(msgs.disabled).parent().removeClass("alert-success").addClass("alert-danger"),$(".enable-wireless",r).removeClass("hidden"),$(".wifi-control-buttons",r).addClass("hidden"),$(".wireless-settings",r).hide(),$('#wireless-update button[type="submit"]').hide(),pcwrt.showOverlay($("#spinner")),$("<iframe/>",{src:e.reload_url+"?addr="+e.addr+"&page=settings%2Fwireless"}).appendTo("#reloader")})}),r.find("[for=channel-1]").attr("for","channel-"+s),r.find("[id=channel-1]").attr("id","channel-"+s),r.find("[for=bw-1]").attr("for","bw-"+s),r.find("[id=bw-1]").attr("id","bw-"+s),r.find("[for=txpower-1]").attr("for","txpower-"+s),r.find("[id=txpower-1]").attr("id","txpower-"+s),r.find("[for=macfilter-1]").attr("for","macfilter-"+s),r.find("[id=macfilter-1]").attr("id","macfilter-"+s),r.find("[for=macaddr-1]").attr("for","macaddr-"+s),r.find("[id=macaddr-1]").attr("id","macaddr-"+s),add_options($("[name=channel]",r),n.channels),add_options($("[name=bw]",r),n.cwidths),add_options($("[name=txpower]",r),n.txpowers),$("[name=block_krack]",r).val(n.block_krack),$("[name=channel]",r).val(n.channel),$("[name=bw]",r).val(n.bw),$("[name=txpower]",r).val(n.txpower),$("select[name=macfilter]",r).val(n.macfilter),"0"==n.onefilter?$("[name=onefilter]",r).prop("checked",!1):$("[name=onefilter]",r).prop("checked",!0),$.each(n.maclist,function(e,a){var t=a.mac;a.hostname&&(t=t+' <span style="text-transform:none;">('+a.hostname+")</span>"),$(".maclist-ul",r).append('<li class="option-list mac-addr"><span class="list-remove pull-right">&nbsp;</span>'+t+"</li>")}),macfilter_change($("select[name=macfilter]",r)),n.interfaces.sort(function(e,a){return e.id-a.id}),$.each(n.interfaces,function(e,a){var t,i,t;0<e?((t=$(".nav-tabs>li:first",r).clone()).removeClass("active"),$("a",t).attr("href","#dev-"+s+"-ifc-"+e).attr("aria-controls",a.display_name).data("vlanid",a.id).html(a.display_name+"<div>&cross;</div>"),$(".nav-tabs",r).append(t),(i=$(".tab-content>div:first",r).clone()).removeClass("in active"),$(".tab-content",r).append(i)):(t=$(".nav-tabs>li:first",r),$("a",t).attr("href","#dev-"+s+"-ifc-"+e).attr("aria-controls",a.display_name).data("vlanid",a.id).text(a.display_name),i=$(".tab-content>div:first",r),add_options($("[name=encryption]",i),n.encryptions),add_options($("[name=cipher]",i),n.ciphers));i.data("vlanid",a.id),i.attr("id","dev-"+s+"-ifc-"+e),i.find("[for=ssid-1]").attr("for","ssid-"+d),i.find("[id=ssid-1]").attr("id","ssid-"+d),i.find("[for=encryption-1]").attr("for","encryption-"+d),i.find("[id=encryption-1]").attr("id","encryption-"+d),i.find("[for=cipher-1]").attr("for","cipher-"+d),i.find("[id=cipher-1]").attr("id","cipher-"+d),i.find("[for=key-1]").attr("for","key-"+d),i.find("[id=key-1]").attr("id","key-"+d),i.find(".form-control-error").remove().end().find(".form-group").removeClass("has-error"),$("[name=hidessid]",i).val(a.hidessid),$("[name=isolate]",i).val(a.isolate),$("[name=ssid]",i).val(a.ssid),$("[name=encryption]",i).val(a.encryption),$("[name=cipher]",i).val(a.cipher),$("[name=key]",i).val(a.key),encryption_change($("select[name=encryption]",i)),d++}),4<$(".nav-tabs>li",r).length&&$(".add-wifi a",r).addClass("disabled")}),fv.devices[0].disabled||$('#wireless-update button[type="submit"]').show(),$("label.required").add_required_mark(window.msgs.required),$("label.control-label[data-hint]").init_hint(),$("input[type=password].reveal").reveal(),$("select[name=macfilter]").on("change",function(){macfilter_change($(this))}),$("select[name=encryption]").on("change",function(){encryption_change($(this))}),$("select").makecombo(),$(".add-wifi").on("click",function(e){if(e.preventDefault(),!$("a",$(this)).hasClass("disabled")){$("#add-wifi-dialog .list-group").empty();var i=$(this),s=[];$.each(fv.vlans,function(e,a){var t=!0;i.siblings().each(function(){if(a.value==$("a",$(this)).data("vlanid"))return t=!1}),t&&s.push(a)}),$.each(s,function(e,a){$("#add-wifi-dialog .list-group").append('<li class="list-group-item clickable" data-id="'+a.value+'">'+a.text+"</li>")});var a=$(this).parents(".tab-pane:last").index();$("#add-wifi-dialog").data("device_idx",a).modal("show")}}),$("#add-wifi-dialog").on("click",".list-group-item",function(){var t=null,i=$(this).data("id");if($.each(fv.vlans,function(e,a){if(a.value==i)return t=a,!1}),t){var e=$("#add-wifi-dialog").data("device_idx"),a=fv.devices[e],s=$("#wireless-settings>form>.tab-content>.tab-pane:eq("+e+")"),n=$(".nav-tabs>li:first",s).clone(),r=$(".nav-tabs",s).data("j");null==r&&(r=$(".nav-tabs",s).children().length),n.removeClass("active"),$(".nav-tabs",s).append(n);var d=$(".tab-content>div:first",s).clone();d.removeClass("in active"),$(".tab-content",s).append(d),$("a",n).attr("href","#dev-"+e+"-ifc-"+r).attr("aria-controls",t.text).data("vlanid",t.value).html(t.text+"<div>&cross;</div>"),d.data("vlanid",t.value),d.attr("id","dev-"+e+"-ifc-"+r);var l=$("[for^=ssid-]",d).attr("for").replace(/^ssid-/,"");d.find("[for=ssid-"+l+"]").attr("for","ssid-"+e+"-"+r),d.find("[id=ssid-"+l+"]").attr("id","ssid-"+e+"-"+r),d.find("[for=encryption-"+l+"]").attr("for","encryption-"+e+"-"+r),d.find("[id=encryption-"+l+"]").attr("id","encryption-"+e+"-"+r),d.find("[for=cipher-"+l+"]").attr("for","cipher-"+e+"-"+r),d.find("[id=cipher-"+l+"]").attr("id","cipher-"+e+"-"+r),d.find("[for=key-"+l+"]").attr("for","key-"+e+"-"+r),d.find("[id=key-"+l+"]").attr("id","key-"+e+"-"+r),d.find("[id=key-"+l+"-clone]").attr("id","key-"+e+"-"+r+"-clone"),$(".nav-tabs",s).data("j",r+1),d.find(".combo-group").remove(),$("[name=hidessid]",d).val(""),$("[name=isolate]",d).val(""),$("[name=ssid]",d).val(""),$("[name=encryption]",d).makecombo().val("none"),$("[name=cipher]",d).makecombo().val("auto"),$("[name=key]",d).val(""),encryption_change($("select[name=encryption]",d)),$("select[name=encryption]",d).on("selection.change",function(){encryption_change($(this))}),$("input[type=password].reveal",d).reveal(),$("a",n).tab("show"),4<$(".nav-tabs>li",s).length&&$(".add-wifi a",s).addClass("disabled")}$("#add-wifi-dialog").modal("hide")}),$(".wifi-networks").on("click",".nav-tabs li div",function(){var e=$(this).parent(),a=e.parents(".nav-tabs:first"),t=e.contents().filter(function(){return 3==this.nodeType}).text();pcwrt.confirm_action(window.msgs.delete_wifi_title,window.msgs.delete_wifi_confirm+' "'+t+'"?',function(){$(e.attr("href")).remove(),e.parent().remove(),$("a:first",a).tab("show"),$(".add-wifi a",a).removeClass("disabled")})}),$(".maclist-div span.list-find").on("click",function(){var s=$(this).parent().parent();s.removeClass("has-error").find(".form-control-error").remove(),pcwrt.submit_form($("#get-assocmacs"),[],function(e){var i=[];$.each(e.assocmacs,function(e,a){var t=!1;$(".maclist-ul li",s).each(function(){if($(this).text().replace(/\(.*\)/,"").trim().toUpperCase()==a.mac.toUpperCase())return!(t=!0)}),t||i.push(a)}),0==i.length?($("#maclist-tbl").hide(),$("#maclist-empty").show(),$("#maclist-modal button[type=submit]").hide()):(i.sort(function(e,a){return(""+e.name).toUpperCase()>(""+a.name).toUpperCase()?1:-1}),$("#maclist-tbl").show(),$("#maclist-empty").hide(),$("#maclist-tbl tr").not(":first").remove(),$.each(i,function(e,a){$("#maclist-tbl").append('<tr><td><input type="checkbox"></td><td>'+a.mac.toUpperCase()+"</td><td>"+a.name+"</td></tr>")}),$("#maclist-tbl input").prop("checked",!1),$("#maclist-modal button[type=submit]").show()),$("#maclist-modal").modal("show")},null,!0)}),$("#maclist-tbl").on("click","input",function(e){var a=$(this).parents("tr:first");if(a.is(":first-child"))$(this).prop("checked")?$("input",a.siblings()).prop("checked",!0):$("input",a.siblings()).prop("checked",!1);else if($(this).prop("checked")){var t=!0;a.siblings().not(":first").each(function(){if(!$("input",$(this)).prop("checked"))return t=!1}),t&&$("input",a.siblings(":first")).prop("checked",!0)}else $("input",a.siblings(":first")).prop("checked",!1)}),$("#maclist-modal button[type=submit]").on("click",function(e){e.preventDefault(),$("#maclist-tbl tr").not(":first").each(function(){if($("input",$(this)).prop("checked")){var e=$("td:eq(1)",$(this)).text().trim(),a=$("td:eq(2)",$(this)).text().trim();""!=a&&(e=e+' <span style="text-transform:none;">('+a+")</span>"),$(".maclist-ul:visible").append('<li class="option-list mac-addr"><span class="list-remove pull-right">&nbsp;</span>'+e+"</li>")}}),$("#maclist-modal").modal("hide")}),$(".maclist-div span.list-add").on("click",function(){var e=$(this).parent().parent();e.removeClass("has-error").find(".form-control-error").remove();var a=$(this).prev().prev().val();pcwrt.is_valid_macaddr(a)?($(".maclist-ul li").each(function(){if($(this).text().replace(/\(.*\)/,"").trim().toUpperCase()==a.toUpperCase())return a=null,!1}),a?($(this).parent().prev().append('<li class="option-list mac-addr"><span class="list-remove pull-right">&nbsp;</span>'+a+"</li>"),$(this).prev().prev().val("")):e.addClass("has-error").append('<p class="form-control-error">'+window.msgs.mac_addr_already_added+".</p>")):e.addClass("has-error").append('<p class="form-control-error">'+window.msgs.invalid_mac_addr+".</p>")}),$(".maclist-div").on("click","span.list-remove",function(){$(this).parent().remove()}),$('#wireless-update button[type="submit"]').on("click",function(e){e.preventDefault(),$("#wireless-settings>form>.tab-content>.tab-pane").each(function(){$(this).data("haserror",!1),$(".tab-pane",$(this)).each(function(){$(this).data("haserror",!1)})});var a=$(this).parents("form");pcwrt.submit_form(a,function(){var e=[];e.push({name:"alwayson",value:$("input[name=alwayson]").val()}),$("#calendar-dialog").data("schedule")&&e.push({name:"schedule",value:JSON.stringify($("#calendar-dialog").data("schedule"))}),$("#wireless-settings [name=onefilter]:visible").prop("checked")&&copy_macfilter_to_other_bands($("#wireless-settings>form>.tab-content>.tab-pane:visible"));var t=[];return $("#wireless-settings>form>.tab-content>.tab-pane").each(function(){var e={};if(e[".name"]=$(this).data("name"),e.disabled=$(this).data("disabled"),e.disabled)t.push(e);else{e.block_krack=$("[name=block_krack]",$(this)).prop("checked")?"1":"0",e.channel=$("[name=channel]",$(this)).val(),e.bw=$("[name=bw]",$(this)).val(),e.txpower=$("[name=txpower]",$(this)).val(),e.onefilter=$("[name=onefilter]",$(this)).prop("checked")?"1":"0",e.macfilter=$("[name=macfilter]",$(this)).val(),e.maclist=[],$(".maclist-ul li",$(this)).each(function(){e.maclist.push($(this).text().replace(/\(.*\)/,"").trim())});var a=[];$(".wifi-networks .tab-pane",$(this)).each(function(){var e={};e.vlanid=$(this).data("vlanid"),e.hidessid=$("[name=hidessid]",$(this)).prop("checked")?"1":"0",e.isolate=$("[name=isolate]",$(this)).prop("checked")?"1":"0",e.ssid=$("[name=ssid]",$(this)).val(),e.encryption=$("[name=encryption]",$(this)).val(),e.cipher=$("[name=cipher]",$(this)).val(),e.key=$("[name=key]",$(this)).val(),a.push(e)}),e.ifaces=a,t.push(e)}}),e.push({name:"devices",value:JSON.stringify(t)}),e},{error:function(e){$.each(e.message,function(e,a){var s=$("#wireless-settings>form>.tab-content>.tab-pane:eq("+e+")");$.each(a.errs,function(e,a){var t=$(':input[name="'+e+'"]',s);t.parent().hasClass("input-group")&&(t=t.parent()),t.parent().addClass("has-error").append('<p class="form-control-error">'+a+"</p>"),s.data("haserror",!0)}),$.each(a.ifaces,function(e,a){var i=$(".tab-content>.tab-pane:eq("+e+")",s);$.each(a,function(e,a){var t=$(':input[name="'+e+'"]',i);t.parent().hasClass("input-group")&&(t=t.parent()),t.parent().addClass("has-error").append('<p class="form-control-error">'+a+"</p>"),i.data("haserror",!0),s.data("haserror",!0)})})}),$("#wireless-settings>form>.nav-tabs a").each(function(){var e=$($(this).attr("href"));if(e.data("haserror"))return $(".nav-tabs a",e).each(function(){var e=$(this).attr("href"),a;if((e=e&&e.trim())&&"#"!=e&&$($(this).attr("href")).data("haserror"))return $(this).tab("show"),!1}),$(this).tab("show"),!1})},success:function(e){$("#wireless-status").text(msgs.enabled).parent().removeClass("alert-danger").addClass("alert-success"),$("#enable-wireless").addClass("hidden"),$("#enable-alert").addClass("hidden"),pcwrt.showOverlay($("#spinner")),$("<iframe/>",{src:e.reload_url+"?addr="+e.addr+"&page=settings%2Fwireless"}).appendTo("#reloader")}})}),$("[name=alwayson]").val(fv.alwayson),initialize_calendar(),$("#extend-time .btn").on("click",function(){var e=$(this).hasClass("list-add")?900:-900,a=$(this);request_pause($("#pause").data("url"),[{name:"pause",value:"1"},{name:"wireless",value:"1"},{name:"delta",value:e}],function(e){"paused"==e.status?$("#extend-time-alert").data("extended",!0).find("span").text(e.message).end().slideDown():$("#extend-time-alert").data("extended",!1).slideUp()})}),/applyreboot/.test(document.referrer)&&($("#status-modal .modal-title").text(window.msgs.success),$("#status-modal .modal-body p").text(window.msgs.apply_success),$("#status-modal").modal("show"))});