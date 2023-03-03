(function () {
        var app = angular.module('myApp', []);
        var excelJsonObj = [];
        app.controller('MyController', ['$scope', function myController($scope) {

                $scope.uploadExcel = function () {



                    var myFile = document.getElementById('file');
                    var input = myFile;
                    var reader = new FileReader();
                    reader.onload = function () {
                        var fileData = reader.result;
                        var workbook = XLSX.read(fileData, {
                            type: 'binary'
                        });
                        workbook.SheetNames.forEach(function (sheetName) {
                            var rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                            excelJsonObj = rowObject;
                        });

                        for (var i = 0; i < excelJsonObj.length; i++) {
                            var data = excelJsonObj[i];

                            console.log('ok');

                        }
                    };

                    reader.readAsBinaryString(input.files[0]);


                }

            }]);
        })();