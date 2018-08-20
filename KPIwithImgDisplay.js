define(['jquery','text!./scoped-bootstrap.css','text!./KPIwithImgDisplay.css','./properties'],  function ($,newbootstrap,reconCss,props) {
	"use strict";

    //Add Css to design the chart
	$( '<style>' ).html(newbootstrap).appendTo( 'head' );
	$( '<style>' ).html(reconCss).appendTo( 'head' );

	//html for UI
	var prevMeasurelength;
	var htmlFormSelect2=	'<div class="bootstrap_inside" style="background:#60a3bc !important;height:70px"> \
							<div class="row"> \
							 <div class="col-md-1 recon-kpi"> \
							</div> \
							<div class="col-md-4" style="height:70px"> \
								<div class="kpi-header-v2" style="font-size : 25px;color:white"> PPOD Marcus </div> \
								<div class="kpi-sub-header-v2"> PPOD Marcus </div> \
						   </div> \
						   <div class="col-md-7" style="height:70px; color:white"> \
								 <div class="kpi-container" > \
								   <div class="row"> \
								   <div class="kpi-none kpi-segment-v2 KPIOne"> One</div> \
								   <div class="kpi-none kpi-segment-v2 KPITwo">Two</div> \
								   <div class="kpi-none kpi-segment-v2 KPIThree">Three</div> \
								   <div class="kpi-none kpi-segment-v2 KPIFour">Four</div> \
								   <div class="kpi-none kpi-segment-v2 KPIFive">Five</div> \
								   <div class="kpi-none kpi-segment-v2 kpi-last-segment KPISix">Six</div> \
								 </div> \
							  </div> \
						   </div> \
						  </div> \
						</div>';




	return{

		//FrontEnd Property defination
		definition : props,

		//initial Data Fetch Property
		initialProperties: {
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [
					{
						qWidth: 10, // 10 - Maximum 10 Columns are Allowed
						qHeight: 1000
					}
				]
			}
		},
		paint: function($element,layout){
			var self = this;
			//console.log("layout",layout);

			var hq = layout.qHyperCube; //Hypercube
			var hqd = hq.qDataPages[0]; //Hypercube datapages use console.log('hqd',hqd); to view values
			var measureLength = hq.qMeasureInfo.length;
			//console.log("measureLengths",measureLength);
//*******************************************************************************************

//**************************Evaluate the Condition*************************************************

	var targetCondition = layout.props.condition;
	var conditionResult;
	var SubKPIClass;
	var SubKPIPrevClass;
	
	switch(targetCondition) {
		case "n" :
			conditionResult = "n";  //No condition provided, show KPI number
			break;
		case "=" :
			conditionResult = (layout.props.KPI == layout.props.KPITarget);
			break;
		case ">" :
			conditionResult = (layout.props.KPI > layout.props.KPITarget);
			break;
		case ">=" :
			conditionResult = (layout.props.KPI >= layout.props.KPITarget);
			break;
		case "<" :
			conditionResult = (layout.props.KPI < layout.props.KPITarget);
			break;
		case "<=" :
			conditionResult = (layout.props.KPI <= layout.props.KPITarget);
			break;
		default:
			conditionResult = "n";
	}
	
	
//console.log("conditionResult",conditionResult);
//*************************************************************************************************
			
			//get the qId from the qlik layout
			var ObjId = layout.qInfo.qId+"_qlik";
			
			/**********Create Ids for each of the KPI element****************/
			var KPIHeader = ObjId+"_KPIHeader";
			var KPISubHeader = ObjId+"_KPISubHeader";
			var KPI = ObjId+"_KPI";
			var KPI_0 = ObjId+"_KPI_0";
			var KPI_1 = ObjId+"_KPI_1";
			var KPI_2 = ObjId+"_KPI_2";
			var KPI_3 = ObjId+"_KPI_3";
			var KPI_4 = ObjId+"_KPI_4";
			var KPI_5 = ObjId+"_KPI_5";
			
			var $myElm = $("#"+ObjId);

			//check if html element already created or not, if not create it
			if(!$myElm.length){
				var $myObj = $(document.createElement("div"));
				$myObj.attr("id",ObjId);
				$myObj.html(htmlFormSelect2);
				$element.append($myObj);
				
				
				$("#"+ObjId +" .kpi-header-v2").attr("id",KPIHeader);			
				$("#"+ObjId +" .kpi-sub-header-v2").attr("id",KPISubHeader);		
				$("#"+ObjId +" .recon-kpi").attr("id",KPI);
				$("#"+ObjId +" .KPIOne").attr("id",KPI_0);			
				$("#"+ObjId +" .KPITwo").attr("id",KPI_1);				
				$("#"+ObjId +" .KPIThree").attr("id",KPI_2);			
				$("#"+ObjId +" .KPIFour").attr("id",KPI_3);
				$("#"+ObjId +" .KPIFive").attr("id",KPI_4);
				$("#"+ObjId +" .KPISix").attr("id",KPI_5);
				
				//Main Header and Alignment
				$("#"+KPIHeader).html(layout.props.KPITitle);
				$("#"+KPIHeader).attr("style","text-align:"+layout.qDef.textAlignment);
				
				//Sub Header and Alignment
				$("#"+KPISubHeader).html(layout.props.KPISubTitle);	
				$("#"+KPISubHeader).attr("style","text-align:"+layout.qDef.textAlignment);
				
				//Main KPI and Image evaluation
				if(conditionResult==true && layout.props.KPITrueImg.length>0) {
					//console.log("Reconsiled",$(".recon-kpi").html());
				
					$("#"+KPI).html('<img class ="kpi-img-v2" style="padding:10px 5%" src="' + layout.props.KPITrueImg + '" alt = "Reconcilled">');
					//$("#"+KPISubHeader).removeClass("red-border");
				}
				else if(conditionResult==false && layout.props.KPIFalseImg.length>0) {
				
					$("#"+KPI).html('<img class ="kpi-img-v2" style="padding:10px 5%" src="' + layout.props.KPIFalseImg + '" alt = "Reconcilled">');
					//$("#"+KPISubHeader).addClass("red-border");
				}
				else {
					$("#"+KPI).html('<h1 class = "kpi-text" >' + layout.props.KPI + '</h1>');	
				}
				
				//Sub KPI if there is any
				for (var i=0; i<hqd.qMatrix.length; i++){
					for(var j=0; j<measureLength ; j++){	
							$("#"+ObjId+"_KPI_"+j).html(hq.qMeasureInfo[j].qFallbackTitle +'</br><span>' + hqd.qMatrix[i][j].qText +'</span>');
							SubKPIClass = "col-md-"+12/measureLength;
							$("#"+ObjId+"_KPI_"+j).removeClass("kpi-none");
							$("#"+ObjId+"_KPI_"+j).addClass(SubKPIClass);
							
							$("#"+ObjId+"_KPI_"+j).css('text-align',hq.qMeasureInfo["0"].textAlignmentMes);
					}
				}	
			}
			// if element is already available then redraw it
			else{ 
				$("#"+KPIHeader).html(layout.props.KPITitle);
				$("#"+KPIHeader).attr("style","text-align:"+layout.qDef.textAlignment);
				
				$("#"+KPISubHeader).html(layout.props.KPISubTitle);	
				$("#"+KPISubHeader).attr("style","text-align:"+layout.qDef.textAlignment);
				
				if(conditionResult==true && layout.props.KPITrueImg.length>0) {
					console.log("Reconsiled",$(".recon-kpi").html());
					$("#"+KPI).html('<img class ="kpi-img-v2" style="padding:10px 5%" src="' + layout.props.KPITrueImg + '" alt = "Reconcilled">');
					//$("#"+KPISubHeader).removeClass("red-border");
				}
				else if(conditionResult==false && layout.props.KPIFalseImg.length>0) {	
					$("#"+KPI).html('<img class ="kpi-img-v2" style="padding:10px 5%" src="' + layout.props.KPIFalseImg + '" alt = "Reconcilled">');
					//$("#"+KPISubHeader).addClass("red-border");
				}
				else {
					$("#"+KPI).html('<h1 class = "kpi-text" >' + layout.props.KPI + '</h1>');	
				}
				

				for (var i=0; i<hqd.qMatrix.length; i++){
					for(var j=0; j<measureLength ; j++){	
							$("#"+ObjId+"_KPI_"+j).html(hq.qMeasureInfo[j].qFallbackTitle +'</br><span>' + hqd.qMatrix[i][j].qText +'</span>');
							
							/* If there are 5 measures to display, make the first and last segment of width 3. Else calculate it dynamically */
							if(measureLength==5){
								if(j==0 || j==4){
									SubKPIClass = "col-md-3";
								}
								else{
									SubKPIClass = "col-md-"+Math.floor(12/measureLength);
								}	
							}
							
							else {
								SubKPIClass = "col-md-"+Math.floor(12/measureLength);
							}
							/****************************************************************************************************************/
							SubKPIPrevClass = "col-md-"+Math.floor(12/prevMeasurelength);
							$("#"+ObjId+"_KPI_"+j).removeClass("kpi-none");
							$("#"+ObjId+"_KPI_"+j).removeClass(SubKPIPrevClass);
							$("#"+ObjId+"_KPI_"+j).addClass(SubKPIClass);
							$("#"+ObjId+"_KPI_"+j).css('text-align',hq.qMeasureInfo["0"].textAlignmentMes);
					} // End of Inner For Loop ==> j
				} // End of Outer For Loop ==> i
			
				//Remove Segment if there is any to remove
				for (var k=prevMeasurelength-1; measureLength<=k ; k-- ){
					SubKPIPrevClass = "col-md-"+Math.floor(12/prevMeasurelength);
					$("#"+ObjId+"_KPI_"+k).addClass("kpi-none");
					$("#"+ObjId+"_KPI_"+k).removeClass(SubKPIPrevClass)
					//console.log("kpi-none","kpi-none class added");
				}
			
			
			   prevMeasurelength = measureLength; //Store the prev measure length. We will use this to remove segement if there is any removed
			}  // End of ID : 001

		}
	}

})
