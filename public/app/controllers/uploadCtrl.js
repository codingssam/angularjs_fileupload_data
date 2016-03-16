angular.module('fileUploadApp', ['ngFileUpload'])
	.constant('articlesUrl', 'http://localhost:3000/articles/')
	.controller('uploadCtrl', function ($scope, Upload, $timeout, articlesUrl) {
		$scope.uploadPhoto = function(file) {
			file.upload = Upload.upload({
				url: articlesUrl,
				data: {
					title: $scope.title,
					content: $scope.content,
					photo: file
				}
			}); // FormData(HTML5 API) 객체에 대한 Promise 객체 생성

			file.upload.then(function (response) {
				$timeout(function () {
					file.result = response.data;
				});
			}, function (response) {
				if (response.status > 0)
					$scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				file.progress = parseInt(100.0 * evt.loaded / evt.total);
			});

		}

		$scope.deletePhoto = function(prop) {
			$scope[prop] = null;
		};

		$scope.reset = function() {
			$scope.title = "";
			$scope.content = "";
			$scope.photoFile = null;
		}
	});