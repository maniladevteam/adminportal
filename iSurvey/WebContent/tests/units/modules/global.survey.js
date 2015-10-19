var global = global || {};

global.globalObj = function() {
	var userId;
	var surveyUUID
};

global.globalObj.prototype = {
		
		AppendNewQuestionType : function(tableId,surveyId){
			var element = "";
			var uuid = this.generateUUID();
			element = element + "<tr><td>Question</td>";
			element = element +	"<td><input type='text' value='' question-id='" + surveyId + uuid + "'";
			element = element +	" class='" + surveyId + "' /></td>";
			element = element +	" <td><select id='" + surveyId + uuid +"'> ";
			
			element = element + "<option value='score'>Score</option>";
			element = element + "<option value='rating'>Rating</option>";
			element = element + "<option value='score'>Verbatim</option>";
			element = element + "</select></td></tr>";
			
			
			$("#" + tableId).append(element);  
			console.log(uuid);
		},
		
		generateUUID : function() {
		    var d = new Date().getTime();
		    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = (d + Math.random()*16)%16 | 0;
		        d = Math.floor(d/16);
		        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		    });
		    return uuid;
		},
		
		
};