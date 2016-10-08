function phaseReport(phase_id){

	total_steps = 0;
	total_steps_done = 0;
	
	for(skey in main.phases[phase_id].steps){
	
		total_steps = total_steps+1;
		
		if(localStorage.getItem(phase_id+"_"+skey)){
			total_steps_done = total_steps_done+1;
		}
		
	}
	
	total_percentage = (total_steps_done/total_steps)*100;
	
	return Math.round(total_percentage);	

}

function fullReport(){

	total_steps = 0;
	total_steps_done = 0;
	
	for(key in main.phases){
	
		for(skey in main.phases[key].steps){
		
			total_steps = total_steps+1;
			
			if(localStorage.getItem(key+"_"+skey)){
				total_steps_done = total_steps_done+1;
			}
			
		}
	
	}
	
	total_percentage = (total_steps_done/total_steps)*100;
	
	return Math.round(total_percentage);	

}

function setUndone(phase_id, step_id){

	var step_storage_id = phase_id+"_"+step_id;
	
	localStorage.removeItem(step_storage_id)
	
	$('#'+step_id+'_checkbox').removeClass("green-text mdi-toggle-check-box");
	$('#'+step_id+'_checkbox').addClass("grey-text mdi-toggle-check-box-outline-blank");

	$('#'+step_id+'_toggler').removeClass(main.app.undone_color);
	$('#'+step_id+'_toggler').addClass(main.app.done_color);		
	
	$('#'+step_id+'_toggler').attr("onclick", "setDone('"+phase_id+"', '"+step_id+"')");	
	
	$('#'+step_id+'_toggler_i').removeClass("mdi-toggle-check-box-outline-blank");
	$('#'+step_id+'_toggler_i').addClass("mdi-toggle-check-box");	

}

function setDone(phase_id, step_id){

	var step_storage_id = phase_id+"_"+step_id;
	
	localStorage.setItem(step_storage_id, '1');
	
	$('#'+step_id+'_checkbox').removeClass("grey-text mdi-toggle-check-box-outline-blank");
	$('#'+step_id+'_checkbox').addClass("green-text mdi-toggle-check-box");

	$('#'+step_id+'_toggler').removeClass(main.app.done_color);
	$('#'+step_id+'_toggler').addClass(main.app.undone_color);
	
	$('#'+step_id+'_toggler').attr("onclick", "setUndone('"+phase_id+"', '"+step_id+"')");	
	
	$('#'+step_id+'_toggler_i').removeClass("mdi-toggle-check-box");
	$('#'+step_id+'_toggler_i').addClass("mdi-toggle-check-box-outline-blank");
	
}


function loadPhases(){
	
	$(".brand-logo").html(main.app.name);
	
	$("nav").removeClass();
	$("nav").addClass(main.app.main_color);	
	
	$("nav").show();
	
	$('.container').load('assets/html/phases.html', function(){

		var phases = main.phases;
					
		for (var key in phases) {
			
			phase = phases[key];

			phase.phase_id = key;
			
			phase.phase_report = phaseReport(phase.phase_id);
			
			phase.main_color = main.app.main_color;
			
			if(!phase.card_color){ phase.card_color = "blue-grey"; }
			
			var template = $('#phases_list_template').html();

			var html = Mustache.to_html(template, phase);

			$('.content_area').append(html);	

		}
		
		activateCards();
		
		setHomeButton();
			
	}).hide().fadeIn('slow');
	
}

function activateCards(){

	$(".card-link").click(function(){
		
		setPhasesButton();
	
		phase_id = $(this).attr("phase_id");
		
		$(".brand-logo").html(main.phases[phase_id].phase);
		
		$("nav").removeClass();
		$("nav").addClass(main.phases[phase_id].card_color);
	
		
		steps = main.phases[phase_id].steps;
					
		$('.container').load('assets/html/steps.html', function(){

			$(".phase_description").html(main.phases[phase_id].description_full);
		
			for (var key in steps) {
				
				step = steps[key];
				
				step.step_id = key;
				
				step.phase_id = phase_id;
				
				step.main_color = main.app.main_color;
				
				step.done_color = main.app.done_color;
				
				step.undone_color = main.app.undone_color;
				
				step.info_color = main.app.info_color;
				
				
				if(localStorage.getItem(phase_id+"_"+step.step_id)){
				
					step.step_status = true;
					
				}else{
				
					step.step_status = false;
					
				}
				
				var template = $('#step_template').html();

				var html = Mustache.to_html(template, step);

				$('.content_area').append(html);	

			}
			
			activateSteps();
			
		}).hide().fadeIn('slow');
		
	});
	
}


function activateSteps(){
	
	$('.open-step').click(function(){

		step_id = $(this).attr('step_id');
		
		$('.container').load("assets/html/step.html", function(){

			step = steps[step_id];

			var template = $('#step_template').html();

			var html = Mustache.to_html(template, step);

			$('.step_content').append(html);

			
			//Sets back button
			
			var template = $('#back_button_template').html();

			var html = Mustache.to_html(template, step);

			$('.left_menu_action').html(html);				
		
			activateCards();	

			
			//Prepare Notes 
			
			step_notes_storage_id = step.phase_id+"_"+step_id+"_notes";
			
			step_notes = localStorage.getItem(step_notes_storage_id);
			
			if(step_notes){
			
				$("#step_textarea").val(step_notes);
				
				$("#step_textarea").focus();
				
			}
			
			$("#step_textarea").keyup(function(){
				
				localStorage.setItem(step_notes_storage_id, $(this).val());
				
			});
			

		}).hide().fadeIn('slow');
		
	});
	
}

function setHomeButton(){

	var template = $('#home_button_template').html();
	
	var html = Mustache.to_html(template);

	$('.left_menu_action').html(html);		

	$(".home_link").click(function(){
	
		loadStartScreen();
		
		admob.requestInterstitialAd();
		
	});
	
}

function setPhasesButton(){

	var template = $('#phases_button_template').html();
	
	var html = Mustache.to_html(template);

	$('.left_menu_action').html(html);		

	$(".start-button").click(function(){
	
		loadPhases();
		
	});
	
}

function loadStartScreen(){

	loadAds();

	$("nav").hide();

	$('.container').load('assets/html/start.html', function(){

		$('.left_menu_action').html("");
		
		var data = {
			"app_description" : main.app.description,
			"main_color" : main.app.main_color,
		};
		
		//Sets total
		
		var total_done = fullReport();
		
		if(total_done > 0){
		
			data.total_done=total_done;
			
		}
		
		//Load Home 
		
		var template = $('#home_content').html();
		
		var html = Mustache.to_html(template, data);

		$('.home_content').html(html);
		
		//Activate Start Button
	
		$(".start-button").click(function(){
		
			loadPhases();
			
		});	

		
	}).hide().fadeIn('slow');

}


$(document).ready(function(){

	$(".brand-logo").html(main.app.name);
	
	loadStartScreen();
	
});