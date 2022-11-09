var error=0;
var checkOutCart=loadObjectLocal("cart");
var checkOutTotalItems=loadObjectLocal("totalItems");

if(checkOutCart && checkOutTotalItems>0)
{
	document.getElementById("check_out_count_product").innerText = checkOutTotalItems;
	printCart(checkOutCart,"check_out_cart_list");
	printCart(checkOutCart,"check_out_cart_list_modal");
}

// Exercise 6
function validate() {
	error=0;
	// Get the input fields
	var fName = document.getElementById("fName");
	var fLastName = document.getElementById("fLastN");
	var fEmail = document.getElementById("fEmail");
	var fPassword = document.getElementById("fPassword");
	var fAddress = document.getElementById("fAddress");
	var fPhone = document.getElementById("fPhone");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorLastName = document.getElementById("errorLastN");
	var errorEmail = document.getElementById("errorEmail");  
	var errorPassword = document.getElementById("errorPassword");  
	var errorAddress = document.getElementById("errorAddress");  
	var errorPhone = document.getElementById("errorPhone");  
	
	// Validate fields entered by the user: name, phone, password, and email
	//Validamos que no están vacios y tienen almenos 3 caracteres
	validateNotEmptyAndThreeCharacters(fName);
	validateNotEmptyAndThreeCharacters(fLastName);
	validateNotEmptyAndThreeCharacters(fEmail);
	validateNotEmptyAndThreeCharacters(fPassword);
	validateNotEmptyAndThreeCharacters(fAddress);
	validateNotEmptyAndThreeCharacters(fPhone);

	//Validamos que nombre y apellido tienen solo letras
	validateOnlyLetters(fName);
	validateOnlyLetters(fLastName);

	//Validamos que telefono solo tiene números
	validateOnlyNumbers(fPhone);


	//Validamos que password tenga letras y números
	validatePassword(fPassword);

	//Validamos que password tenga letras y números
	validateEMail(fEmail);

	if(error>0){
		alert("Error");
	}else{
		alert("OK");
	}

}

function validateNotEmptyAndThreeCharacters(field)
{
	if(field.value == "" || field.value.length <3)
	{
		error++;
		field.classList.add("is-invalid");
	}
	else
		field.classList.remove("is-invalid");
}

function validateOnlyLetters(field)
{
	var letters = /^[A-Za-z]+$/;
	if(!field.value.match(letters))
	{
		error++;
		field.classList.add("is-invalid");
	}
	else
		field.classList.remove("is-invalid");
}

function validateOnlyNumbers(field)
{
	var numbers = /^[0-9]+$/;
	if(!field.value.match(numbers))
	{
		error++;
		field.classList.add("is-invalid");
	}
	else
		field.classList.remove("is-invalid");
}

function validatePassword(field)
{
	var numbersAndLetters = /^[A-Za-z0-9]+$/;
	var bl = field.value.match(numbersAndLetters);

	if(field.value.match(numbersAndLetters)==null )
	{
		error++;
		field.classList.add("is-invalid");
	}
	else
		field.classList.remove("is-invalid");
}

function validateEMail(field)
{
	if(!field.value.match("@") )
	{
		error++;
		field.classList.add("is-invalid");
	}
	else
		field.classList.remove("is-invalid");
}
