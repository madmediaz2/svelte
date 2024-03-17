<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { authStore } from '../../stores/authStore';
	import { db } from '../../lib/firebase/firebase.client';
	import { collection, addDoc } from 'firebase/firestore';

	let amount = null;
	let linkToBusiness = '';
	let category = null;

	class Form {
		constructor(uid, category, appendedParameters, linkToBusiness, amount) {
			this.uid = uid;
			this.category = category;
			this.appendedParameters = appendedParameters;
			this.linkToBusiness = linkToBusiness;
			this.amount = amount;
		}

		convertForm() {
			const form = {
				uid: this.uid,
				category: this.category,
				appendedParameters: this.appendedParameters,
				linkToBusiness: this.linkToBusiness,
				amount: this.amount
			};
			return form;
		}
	}

	//Appended parameters will be added to the appendedParameters array
	let appendedParameters = [];

	//Function to add a new parameter to the appendedParameters array
	function addParameter(newParameter) {
		appendedParameters = [...appendedParameters, newParameter];
	}

	//Function to remove a parameter from the appendedParameters array
	function removeParameter(parameterId) {
		appendedParameters = appendedParameters.filter((p) => p.id !== parameterId);
	}

	const dispatch = createEventDispatcher();

	const parameterButtons = [
		'Add Staff', // 0
		'Add Beverages', // 1
		'Add Food', // 2
		'Add Music', // 3
		'Add Decorations', // 4
		'Add Scenery', // 5
		'Add Lighting', // 6
		'Add Entertainment', // 7
		'Add Security', // 8
		'Add Cleaning', // 9
		'Add Parking', // 10
		'Add Insurance', // 11
		'Add Legal', // 12
		'Add Utilities', // 13
		'Add Maintenance', // 14
		'Add Rent', // 15
		'Add Loans', // 16
		'Add Equipment', // 17
		'Add Furniture', // 18
		'Add Technology', // 19
		'Add Software', // 22
		'Add Hardware', // 23
		'Add Services', // 24
		'Add Training', // 25
		'Add Travel', // 26
		'Add Subscriptions', // 27
		'Add Memberships', // 28
		'Add Licenses', // 29
		'Add Permits', // 30
		'Add Certifications', // 31
		'Add Custom Parameters' // 32
	];

	const parameterFieldExamples = [
		'e.g. John Doe', // 0
		'e.g. Coffee, Tea, Beer', // 1
		'e.g. Pizza, Bagels, Sandwiches', // 2
		'e.g. Hip-Hop, Jazz, Rock', // 3
		'e.g. Theme Color, Modern, Vintage', // 4
		'e.g. City Views, Landscapes', // 5
		'e.g. LED, Neon, Lasers', // 6
		'e.g. DJ, Television, Live Band', // 7
		'e.g. Bouncer, Security Guard', // 8
		'e.g. Janitor, Cleaning Service', // 9
		'e.g. Parking Lot, Valet, Street Parking', // 10
		'e.g. Liability, Property, Health', // 11
		'e.g. Legal Advice, Legal Services,', // 12
		'e.g. Water, Gas, Electricity', // 13
		'e.g. Maintenance Worker, Maintenance Service', // 14
		'e.g. Rent, Lease, Sublet', // 15
		'e.g. Mortgage, Loan, Payment Plan', // 16
		'Special Equipment Of The Business', // 17
		'e.g. Tables, Chairs, Bar Stools', // 18
		'Special Technology Of The Vusiness', // 19
		'e.g. Software, Application, Program', // 22
		'e.g. Hardware, Computer, Server', // 23
		'Special Services Ff The business', // 24
		'Special Training Of The Business', // 25
		'e.g. Bike, Train, Bus', // 26
		'Special Subscriptions Of The Business', // 27
		'Special Memberships Of The Business', // 28
		'Special Licenses Of The Business', // 29
		'Special Permits Of The Business', // 30
		'Special Certifications Of The Business', // 31
		'Custom Input Field' // 32
	];

	let parameterButtonsForCategory = [];

	//Function to push the index of the parameter buttons to the parameterButtonsForCategory array
	function pushIndex(...index) {
		let arrayList = [];
		index.forEach((i) => {
			arrayList.push(parameterButtons[i]);
		});
		return arrayList;
	}

	//Function to check if all checkboxes are unchecked
	function allUnchecked(arrayList) {
		let allUnchecked = true;
		arrayList.forEach((e) => {
			let checkbox = document.getElementById(e);
			if (checkbox.checked) {
				allUnchecked = false;
			}
		});
		return allUnchecked;
	}

	//Function to check if there are any appended parameters
	function getParameters(arrayList) {
		let parameters = true;
		if (arrayList.length > 0) {
			parameters = false;
		}
		return parameters;
	}

	onMount(() => {
		const mainCategories = [
			'',
			[
				'Sandwich Shop',
				'Croissant Shop',
				'Coffee Bar',
				'Lunchroom',
				'Ice Cream Parlor',
				'Tea Room',
				'Juice Bar'
			], // 1 light catering/day bag
			[
				'Hotel / Motel',
				'Bistro',
				'Brasserie',
				'Restaurant',
				'Pub',
				'Cafeteria / Snack Bar',
				'Pizzeria',
				'Grill Room'
			], //2 catering
			[
				'Café / Grand Café',
				'Beer house / Tavern',
				'Billiard Center / Snooker Café',
				'Bowling Alley',
				'Arcade'
			], // 3 medium catering
			['Venue Rental', 'Party Center', 'Banquet Hall', 'Casino', 'Discotheque', 'Bar', 'Nightclub'], // 4 heavy catering
			[
				'Air-BNB',
				'Rental-Service',
				'Apartment Rental',
				'Car / Boat Leasing',
				'Car / Boat Retailer',
				'Boat Leasing',
				'Boat Retailer',
				'Real Estate Agent'
			], // 5 renting and leasing
			['Travel Agency', 'Bus Company', 'Taxi Company', 'Car / Boat Rental', 'Bike / Scooter Rental'] // 6 travel and transport
		];

		let categorySelect = document.getElementById('category--Select');
		let pmFieldCard = document.getElementById(`js--parameters`);
		let pmFields = document.getElementById('js--pmFields');
		let inputFieldsCard = document.getElementById('js--inputFieldsCard');
		let inputFields = document.getElementById('js--inputFields');

		//initialize the category select with correct category as value
		for (let i = 1; i < mainCategories.length; i++) {
			mainCategories[i].forEach((element) => {
				//console.log(element);
				let option = document.createElement('option');
				option.value = i + ' ' + element;
				option.text = element;
				categorySelect.appendChild(option);
			});
		}

		//initialize the parameter buttons
		categorySelect.addEventListener('change', (event) => {
			let currentCategory = event.target.value;
			console.log(currentCategory);

			if (currentCategory.indexOf('1') > -1) {
				// light catering/day bag
				parameterButtonsForCategory = pushIndex(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
			}
			if (currentCategory.indexOf('2') > -1) {
				// catering
				parameterButtonsForCategory = pushIndex(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
			}
			if (currentCategory.indexOf('3') > -1) {
				// medium catering
				parameterButtonsForCategory = pushIndex(0, 1, 2, 3, 4, 5);
			}
			if (currentCategory.indexOf('4') > -1) {
				// heavy catering
				parameterButtonsForCategory = pushIndex(0, 1, 2, 3, 4, 5);
			}
			if (currentCategory.indexOf('5') > -1) {
				// renting and leasing
				parameterButtonsForCategory = pushIndex(0, 1, 2, 3, 4, 5, 6, 7);
			}
			if (currentCategory.indexOf('6') > -1) {
				// travel and transport
				parameterButtonsForCategory = pushIndex(0, 1, 2, 3, 4, 5);
			}
		});

		//hide the parameter fields when all checkboxes are unchecked
		pmFieldCard.addEventListener('change', () => {
			if (allUnchecked(parameterButtonsForCategory)) {
				pmFields.style.display = 'none';
			}
		});

		pmFields.addEventListener('click', () => {
			if (allUnchecked(parameterButtonsForCategory)) {
				pmFields.style.display = 'none';
			}
		});

		//hide the input fields when there are no appended parameters
		inputFields.addEventListener('click', () => {
			if (getParameters(appendedParameters)) {
				inputFieldsCard.style.display = 'none';
			}
		});
	});

	//Function to create a new form
	function createForm() {
		const form = new Form(
			$authStore.currentUser.uid,
			category.substring(2),
			appendedParameters,
			linkToBusiness,
			amount
		);
		console.log(form);
		return form;
	}

	async function saveFormData() {
		// Assuming createForm properly creates and returns a form object
		const form = createForm();

		// Ensure form is not null or undefined
		if (!form) {
			console.error('Form data is missing or incomplete.');
			return;
		}

		// Ensure there's a current user UID available
		const currentUserUid = $authStore.currentUser?.uid;
		if (!currentUserUid) {
			console.error('No current user UID found. User might not be authenticated.');
			return;
		}

		try {
			// Directly add the form data to this user's 'forms' sub-collection in Firestore
			let savedForm = form.convertForm();
			await addDoc(collection(db, 'users', currentUserUid, 'forms'), { savedForm });
			console.log(form);

			console.log("Form saved successfully under the user's document");
		} catch (error) {
			console.error('Error saving form:', error);
		}
	}
</script>

<article class="text-center">
	<div class="card-container">
		<div class="card" style="width: 50rem;">
			<div class="card-header">
				<h5 class="card-title">Reviews</h5>
			</div>
			<div class="card-body">
				<!--Category Select-->
				<select
					on:change={(event) => {
						category = event.target.value; //sets the value of the selected category
						console.log(category);
						document.getElementById('js--parameters').style.display = 'block';
					}}
					class="form-select"
					id="category--Select"
					aria-label="Default select example"
				>
					<option selected>Select A Category</option>
				</select>

				<!--Parameter Fields-->
				<div class="card-body card parameters-card" id="js--parameters" style="display: none;">
					<div class="card">
						<div class="parameters-card-body card-body">
							<!--Parameter Buttons-->
							<div class="parameter-buttons" role="group" id="parameters--buttons">
								{#each parameterButtonsForCategory as pmButtons}
									<input
										type="checkbox"
										class="btn-check"
										id={pmButtons}
										checked={false}
										autocomplete="off"
										on:click={(event) => {
											let checked = event.target.checked;
											let field = document.getElementById(`pmField-[${pmButtons}]`);
											let fields = document.getElementById('js--pmFields');
											fields.style.display = 'block';
											//console.log(event.target.id);
											if (checked) {
												field.style.display = 'block';
											} else {
												field.style.display = 'none';
											}
										}}
									/>
									<label class="btn btn-sm btn-outline-primary" for={pmButtons}>{pmButtons}</label>
								{/each}
							</div>
						</div>
					</div>

					<!--Input Fields-->
					<div
						class="card-body card parameters-field"
						id="js--pmFields"
						style="display: none; margin-top: 5px; height: fit-content"
					>
						{#each parameterButtonsForCategory as pmFields}
							<div id={`pmField-[${pmFields}]`} style="display: none;">
								<div class="customer-inputs input-group input-group-sm mb-3">
									<span class="input-group-text">
										{pmFields.substring(3)}
									</span>
									<input
										type="text"
										class="form-control"
										id={`pmField-input-[${pmFields}]`}
										placeholder={`${parameterFieldExamples[parameterButtons.indexOf(pmFields)]}`}
										on:keyup={(event) => {
											if (event.key === 'Enter') {
												let inputFields = document.getElementById('js--inputFieldsCard');
												inputFields.style.display = 'block';
												let appendedValue = document.getElementById(`pmField-input-[${pmFields}]`);
												addParameter({
													id: Date.now(), // Unique ID for the new parameter
													parameter: pmFields.substring(4),
													value: appendedValue.value
												});
												appendedValue.value = '';
											}
										}}
									/>
									<button
										class="btn btn-outline-secondary"
										type="button"
										on:click={() => {
											document.getElementById(`pmField-[${pmFields}]`).style.display = 'none';
											let checkbox = document.getElementById(`${pmFields.toString()}`);
											checkbox.checked = false;
											let appendedValue = document.getElementById(`pmField-input-[${pmFields}]`);
											appendedValue.value = '';
										}}
									>
										Hide
									</button>
									<button
										class="btn btn-outline-secondary"
										type="button"
										on:click={() => {
											let inputFields = document.getElementById('js--inputFieldsCard');
											inputFields.style.display = 'block';
											let appendedValue = document.getElementById(`pmField-input-[${pmFields}]`);
											addParameter({
												id: Date.now(), // Unique ID for the new parameter
												parameter: pmFields.substring(4),
												value: appendedValue.value
											});
											appendedValue.value = '';
										}}
									>
										Add
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!--Appended Parameters-->
				<div class="card" style="margin-top: 5px; display: none;" id="js--inputFieldsCard">
					<div class="appended-parameters-card card-body parameters-card" id="js--inputFields">
						<div class="appended-parameters-fields">
							{#each appendedParameters as appendedPm}
								<div
									class="input-group input-group-sm mb-3"
									id={`appended-${appendedParameters.id}`}
								>
									<form class="form-floating">
										<input
											type="text"
											class="form-control form-control-sm"
											id={appendedPm.id}
											bind:value={appendedPm.value}
										/>
										<label for={appendedPm.id}>{appendedPm.parameter}</label>
									</form>
									<button
										class="btn btn-outline-secondary"
										type="button"
										on:click={() => {
											removeParameter(appendedPm.id);
											console.log(appendedPm);
										}}
									>
										Remove
									</button>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<div class="card-footer">
				<!--link to business-->
				<div class="customer-inputs input-group input-group-sm mb-3">
					<span class="input-group-text" id="inputGroup-sizing-sm"> Link To Business </span>
					<input type="text" class="form-control" bind:value={linkToBusiness} />
				</div>
				<!--Amount of reviews-->
				<div class="customer-inputs-footer">
					<input
						type="number"
						class="form-control"
						id="amountInput"
						placeholder="Amount of reviews"
						min="0"
						bind:value={amount}
						on:change={() => {
							document.getElementById('pricing--card').style.display = 'block';
							document.getElementById('pricing--button2').style.display = 'none';
						}}
					/>
					<a class="btn btn-primary" href="/calculator"> Calculator </a>
				</div>
				<div class="card-body">
					<!--Pricing Card-->
					<div class="card pricing-card" style="display: none;" id="pricing--card">
						<div class="card-body pricing-card-body">
							<p class="card-text">Reviews: {amount}</p>
							<p class="card-text">Total: €{amount * 4}</p>
							<p class="card-text">Price per review: €4</p>
						</div>
						<div class="card-footer">
							<button
								class="btn btn-primary"
								on:click={() => {
									dispatch('submit', {
										amount,
										linkToBusiness,
										category
									});
								}}
							>
								Buy
							</button>
							<button
								class="btn btn-outline-primary"
								on:click={() => {
									document.getElementById('pricing--card').style.display = 'none';
									document.getElementById('pricing--button2').style.display = 'block';
								}}
							>
								Hide
							</button>
						</div>
					</div>
					<div class="true-footer">
						<input
							type="range"
							min="0"
							max="1000"
							style="width: 100%"
							bind:value={amount}
							on:change={() => {
								document.getElementById('pricing--card').style.display = 'block';
								document.getElementById('pricing--button2').style.display = 'none';
							}}
						/>
						<button
							class="btn btn-outline-primary btn-sm"
							style="width: 100%; display: none;"
							id="pricing--button2"
							on:click={() => {
								dispatch('submit', {
									amount,
									linkToBusiness,
									category
								});
							}}
						>
							Buy €{amount * 4}
						</button>
						{#if $authStore.currentUser}
							<button class="btn btn-outline-primary" style="width: 100%;" on:click={saveFormData}>
								Save
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</article>

<style>
	.card-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 70vh;
		margin-top: 5vh;
	}

	.customer-inputs {
		display: flex;
		flex-direction: row;
	}
	.customer-inputs-footer {
		display: flex;
		justify-content: flex-end;
		margin-top: 10px;
		gap: 5px;
	}

	.pricing-card {
		margin-top: 5px;
		justify-content: left;
	}
	.pricing-card-body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		margin-left: auto;
		padding: 10px;
	}

	.true-footer {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-top: 10px;
	}

	.parameters-card {
		display: flex;
		flex-direction: column;
		margin-top: 5px;
	}

	.parameter-buttons {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		margin: 0;
		gap: 5px;
	}

	.appended-parameters-card {
		margin: 5px;
		padding: 5px;
	}

	.appended-parameters-fields {
		display: flex;
		flex-direction: column;
		padding: 5px;
		margin-top: 10px;
		margin-bottom: 0px;
	}
</style>
