define([],
    function (){
        'use strict';

        var dims = {
            uses:"dimensions",
            min:1,
            max:1
        };


		
		var KPITitleProp = {
			ref: "props.KPITitle",
			label: "Title",
			type: "string",
			expression: "optional"
		};
		var KPISubTitleProp = {
			ref: "props.KPISubTitle",
			label: "Sub Title",
			type: "string",
			expression: "optional"
		};
		
      var textAlignment = {
        type: "string",
        component: "item-selection-list", // buttongroup
        icon: true,
        horizontal: true,
        label: "Alignment",
        translation : "properties.Alignment",
        ref: "qDef.textAlignment",
        defaultValue: "center",
        items : [
          {
            value: "left",
            component : "icon-item",
            icon:"M"
          },
          {
            value: "center",
            icon:"O",
            component : "icon-item"
          },
          /*
          label: "Center",
          labelPlacement : "bottom",
          */
          {
            value: "right",
            icon:"N",
            component : "icon-item"
          }
        ]
      };

      var textAlignment_Mes = {
        type: "string",
        component: "item-selection-list", // buttongroup
        icon: true,
        horizontal: true,
        label: "Alignment",
        translation : "properties.Alignment",
        ref: "qDef.textAlignmentMes",
        defaultValue: "center",
        items : [
          {
            value: "left",
            component : "icon-item",
            icon:"M"
          },
          {
            value: "center",
            icon:"O",
            component : "icon-item"
          },
          /*
          label: "Center",
          labelPlacement : "bottom",
          */
          {
            value: "right",
            icon:"N",
            component : "icon-item"
          }
        ]
      };

        var meas = {
			lable:"Sub Measures",
            uses:"measures",
            min:0,
            max:6,
			items : {
			textAlignment_Mes:textAlignment_Mes
			}
        };
		var KPIProp = {
			ref: "props.KPI",
			label: "Measure",
			type: "string",
			expression: "always"
		};
		var KPITarget = {
			ref: "props.KPITarget",
			label: "Target",
			type: "string",
			expression: "optional"
		};
		
		var KPITrueImg = {
			ref: "props.KPITrueImg",
			label: "True img",
			type: "string",
			expression: ""
		};
		
		var KPIFalseImg = {
			ref: "props.KPIFalseImg",
			label: "False img",
			type: "string",
			expression: ""
		};
		
		var SubKPIProp = {
			ref: "props.KPISub",
			label: "KPI Measure",
			type: "string",
			expression: "always"
		};

		var TargetConditionProp = {
						type: "string",
						component: "dropdown",
						label: "Conditional Operator",
						ref: "props.condition",
						options: [{
							value: "=",
							label: "=",
							tooltip: "Select for ="
						}, {
							value: ">",
							label: ">",
							tooltip: "Select for >"
						},
						{
							value: ">=",
							label: ">=",
							tooltip: "Select for >="
						},
						{
							value: "<=",
							label: "<=",
							tooltip: "Select for <="
						},
						{
							value: "<",
							label: "<",
							tooltip: "Select for <"
						}
						],
						defaultValue: "n"
					}

		
		var myCustomSection = {
			// not necessary to define the type, component "expandable-items" will automatically
			// default to "items"
			 type: "items",
			//component: "expandable-items",
			label: "Title",
			items: {
				KPIProperty: {
					type: "items",
					label: "Title",
					items: {
						KPITitle: KPITitleProp,
						KPISubtitle: KPISubTitleProp,
						textAlignment:textAlignment
					}
				}
			}
		};
		
		var myKPI = {
			// not necessary to define the type, component "expandable-items" will automatically
			// default to "items"
			type: "items",
			//component: "expandable-items",
			label: "KPI",
			items: {
				KPIMeasure: {
					type: "items",
					label: "KPI",
					items: {
						KPIProp: KPIProp,
						TargetConditionProp:TargetConditionProp,
						KPITarget: KPITarget,
						KPITrueImg:KPITrueImg,
						KPIFalseImg:KPIFalseImg
					}
				}
			}
		};
		var mySubKPI = {
			// not necessary to define the type, component "expandable-items" will automatically
			// default to "items"
			type: "items",
			//component: "expandable-items",
			label: "Sub KPI",
			items: {
				KPISubMeasure: {
					type: "items",
					label: "Sub KPI",
					items: {
						SubKPIProp: SubKPIProp
					}
				}

			}
		};
		
		

        return{
            type :"items",
            component : "accordion",
            items : {
				customSection: myCustomSection,
				myKPI : myKPI,
                measures : meas,
				settings: {
				uses: "settings"
				}
            }
        };
    }
);