function vardump(object)
{
	dumpit(object,"things");
	var t = new Array();
	var arraylevel = 0;
	var ret = "";
	function dumpit(object,name)
	{
		ret += multString('&nbsp;',arraylevel*5)+name+' : {<br>';
		arraylevel++;
		for(i in object)
		{
			if(typeof(object[i]) == 'object')
				dumpit(object[i],i);
			else
				ret += multString('&nbsp;',arraylevel*5)+i+' : '+object[i]+'<br>';
		}
		arraylevel--;
		ret += multString('&nbsp;',arraylevel*5)+'}<br>';
		return ret;
	}

	function multString(string,times)
	{
		endstring = '';
		for(butts = 0; butts<times; butts++)
			endstring += string;
		return endstring;
	}
}