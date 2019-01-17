
var DatabaseDebugger = {};

DatabaseDebugger.debug = false;

DatabaseDebugger.debuger = function(message) {
	
	if(DatabaseDebugger.debug) {
		console.log(message);
	}
};

DatabaseDebugger.debugerError = function(message) {
	
	if(DatabaseDebugger.debug) {
		console.error(message);
	}
};

var DatabaseExpr = function(expression) {
	
	this.expression = expression;
};

var Database = function(name, version, displayname, size, $cordovaSQLite, debug) {

	DatabaseDebugger.debug = debug;
	
	//Database Desktop/Device
	
	if (window.sqlitePlugin !== undefined) {
		this.db = window.sqlitePlugin.openDatabase({name:name, location:2, createFromLocation:1});
	} else {
		this.db = window.openDatabase(name, version, displayname, size);
	}

	this.adapter = $cordovaSQLite;
	
	this.configureTransaction = function (populateDB, errorCB, successCB) {
		this.db.transaction(populateDB, errorCB, successCB);
	}
	
	//Database SQL Methods
	
	this.insert = function(table, fields, values) {
		
		var vars = [];
		for(x in fields) {vars.push("?");}
		var sql = "INSERT INTO "+ table +" ("+ fields.join() +") VALUES ("+ vars.join() +")";
		
		DatabaseDebugger.debuger(sql +" => "+ values);
		
		this.adapter.execute(this.db, sql, values).then(function(result) {
			
			DatabaseDebugger.debuger("INSERT OK");
			
		}, function(error, debug) {
			
			DatabaseDebugger.debugerError("INSERT FAIL: ("+ error.code + ") " + error.message);
		});
	};

	this.update = function(table, where, whereValues, field, fieldValues) {

		var values = [];
		var whereVars = [];
		var fieldVars = [];

		for(i = 0 ; i < field.length ; i++) {
			fieldVars.push(field[i] +" = ?");
			values.push(fieldValues[i]);
		}
		
		for(i = 0 ; i < where.length ; i++) {
			if(whereValues[i] == 'IS NULL' || whereValues[i] == 'IS NOT NULL') {
				whereVars.push(where[i] +" "+ whereValues[i]);
			} else {
				whereVars.push(where[i] +" = ?");
				values.push(whereValues[i]);
			}
		}

		var sql = "UPDATE "+ table +" SET "+ fieldVars.join() + " WHERE "+ whereVars.join(' AND ');
		
		DatabaseDebugger.debuger(sql +" => "+ values);
		
		this.adapter.execute(this.db, sql, values).then(function(result) {
			
			DatabaseDebugger.debuger("UPDATE OK: Rows Affected:" + result.rowsAffected);
			
		}, function(error) {
			
			DatabaseDebugger.debugerError("UPDATE FAIL: ("+ error.code + ") " + error.message);
		});
	};
	
	this.select = function(table, fields, where, whereValues, groupBy, orderBy, limit, callback) {
		
		var rows = [];
		var whereFields = [];
		
		if(fields == null) {
			fields = ["*"];
		}
		
		if(where != null) {
			for(i = 0 ; i < where.length ; i++) {
				if(where[i] instanceof DatabaseExpr) {
					whereFields.push(where[i].expression);
				} else {
					whereFields.push(where[i] +" = ?");
				}
			}
		}
		
		var sql = "SELECT "+ fields.join() + " FROM " + table + (where != null ? " WHERE "+ whereFields.join(' AND ') : '')+
		(groupBy != null ? " GROUP BY "+ groupBy.join() : '')+
		(orderBy != null ? " ORDER BY "+ orderBy.join() : '')+
		(limit   != null ? " LIMIT "+ limit.join() : '');
		
		DatabaseDebugger.debuger(sql +" => "+ whereValues);
		
		this.adapter.execute(this.db, sql, whereValues).then(function(result) {

			DatabaseDebugger.debuger("SELECT OK: Rows Affected:" + result.rows.length);
			
			if(result.rows.length > 0) {
				for(i = 0 ; i < result.rows.length ; i++) {
					rows.push(result.rows.item(i));
				}
			}
			
			callback(rows);
			
		}, function(error, debuger) {
			DatabaseDebugger.debugerError("SELECT FAIL: ("+ error.code + ") " + error.message);
		});
	};

	this.delete = function(table, where, whereValues) {

		var values = [];
		var whereVars = [];

		for(i = 0 ; i < where.length ; i++) {
			if(whereValues[i] == 'IS NULL' || whereValues[i] == 'IS NOT NULL') {
				whereVars.push(where[i] +" "+ whereValues[i]);
			} else {
				whereVars.push(where[i] +" = ?");
				values.push(whereValues[i]);
			}
		}

		var sql = "DELETE FROM "+ table + " WHERE "+ whereVars.join(' AND ');
		
		DatabaseDebugger.debuger(sql +" => "+ values);
		
		this.adapter.execute(this.db, sql, values).then(function(result) {
			
			DatabaseDebugger.debuger("DELETE OK: Rows Affected:" + result.rowsAffected);
			
		}, function(error) {
			
			DatabaseDebugger.debugerError("DELETE FAIL: ("+ error.code + ") " + error.message);
		});
	};

	this.query = function(sql, params, callback) {
		
		var rows = [];
		
		DatabaseDebugger.debuger(sql +" => "+ params);
		
		this.adapter.execute(this.db, sql, params).then(function(result) {

			DatabaseDebugger.debuger("QUERY OK: Rows Affected:" + result.rows.length);
			
			if(result.rows.length > 0) {
				for(i = 0 ; i < result.rows.length ; i++) {
					rows.push(result.rows.item(i));
				}
			}
			
			callback(rows);
			
		}, function(error, debuger) {
			
			DatabaseDebugger.debugerError("QUERY FAIL: ("+ error.code + ") " + error.message);
		});
	};
}	