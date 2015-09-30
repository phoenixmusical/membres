
module.exports = function(){
	var map = {};
	return {
		get: function(index){
			return map[index] || [];
		},
		add: function(index, item){
			if(map[index]){
				map[index].push(item);
			}else{
				map[index] = [item];
			}
		}
	};
};