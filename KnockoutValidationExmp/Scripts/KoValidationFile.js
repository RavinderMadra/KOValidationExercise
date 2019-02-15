
$(function () {
    
    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        errorClass: 'errorStyle',
        messageTemplate: null

    }, true);
    createmodel.list();



var createmodel = {

    Id: ko.observable(0),
    Name: ko.observable().extend({ required: true, minLength: 2, maxLength: 17 }),
    Address: ko.observable().extend({ required: true, minLength: 2, maxLength: 17 }),
    Customerrec: ko.observableArray([]),

    list: function () {
        var thisObj = this;
        $.ajax({
            url: '/Home/ListCustomer',
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {

                thisObj.Customerrec(data); //Here we are assigning values to KO Observable array

            },
            error: function () {
                alert('Record not fetch');
            }
        });

    },


    submit: function () {
        debugger;
        if (createmodel.errors().length === 0) {
            debugger;
            $.ajax({

                url: '/Home/Create',
                type: 'post',
                dataType: 'json',
                data: ko.toJSON(this), //Here the data wil be converted to JSON
                contentType: 'application/json',
                success: function (db) {
                    clearTextBox();
                    $('#myModal').modal('hide');
                    alert('data saved');                                      
                  
                    createmodel.list(); 
                    
                },
                error: function (db) {

                    alert('data not saved');
                }
            });
        }

        else {
            debugger;
            alert('Please check your submission');

        }

    },


    Edit: function (Id) {
        debugger;
        $.ajax({
            url: "/Home/Edit/?Id=" + Id,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (res) {
                debugger;
                $('#myModal').modal({
                    show: 'true'
                });
                createmodel.Id(res.Id);
                createmodel.Name(res.Name);
                createmodel.Address(res.Address);
            },
            error: function () {
                alert("data not edited");
            }
        });

    },

    Delete: function (Id) {
        debugger;
        var ans = confirm("Are you sure you want to delete this Record?");
        if (ans) {
            $.ajax({
                url: "/Home/Delete/?Id=" + Id,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (res) {
                    createmodel.list();
                    alert("data deleted");
                },
                error: function () {
                    alert("data not deleted");
                }
            });
        }

        else {
            debugger;
            alert('error in remove data');
        }

    },


};

function Customerrec(data) {

    this.Id = ko.observable(data.Id);
    this.Name = ko.observable(data.Name);
    this.Address = ko.observable(data.Address);
}

function clearTextBox() {

    $('#Name').val("");
    $('#Add').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    createmodel.Id = 0;
    createmodel.Name = "";
    createmodel.Address = "";
}
createmodel.errors = ko.validation.group(createmodel);
    ko.applyBindings(createmodel);

});