<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { authHandlers, authStore } from '../../stores/authStore';

	let amount = null;
	let linkToBusiness = '';
	let category = null;
	const dispatch = createEventDispatcher();
	const parameterButtons = [
			'Add Staff',             // 0
			'Add Beverages',         // 1
			'Add Food',              // 2
			'Add Music',             // 3
			'Add Decorations',       // 4
			'Add Lighting',          // 5
			'Add Entertainment',     // 6
			'Add Security',          // 7
			'Add Cleaning',          // 8
			'Add Parking',           // 9
			'Add Insurance',         // 10
			'Add Legal',             // 11
			'Add Utilities',         // 12
			'Add Maintenance',       // 13
			'Add Rent',              // 14
			'Add Mortgage',          // 15
			'Add Equipment',         // 16
			'Add Furniture',         // 17
			'Add Technology',        // 18
			'Add Software',          // 21
			'Add Hardware',          // 22
			'Add Services',          // 23
			'Add Training',          // 24
			'Add Travel',            // 25
			'Add Subscriptions',     // 26
			'Add Memberships',       // 27
			'Add Licenses',          // 28
			'Add Permits',           // 29
			'Add Certifications',    // 30
			'Add Custom Parameters', // 31
		];
		let buttonsCat1 =[];

		


	function addNewInputField() {
		//todo
	}
	

	onMount(() => {
		// Add any initialization logic here

		const mainCategories = [
			'',
			[
			"Sandwich Shop",
			"Croissant Shop",
			"Coffee Bar",
			"Lunchroom",
			"Ice Cream Parlor",
			"Tea Room",
			"Juice Bar",
			],					 // 1 light catering/day bag
			[
			'Hotel / Motel',
			'Bistro',
			'Brasserie',
			'Restaurant',
			'Pub',
			'Cafeteria / Snack Bar',
			'Pizzeria',
			'Grill Room'
			], 					//2 catering
			[
			'Café / Grand Café',
			'Beer house / Tavern',
			'Billiard Center / Snooker Café',
			'Bowling Alley',
			'Arcade',
			], 					// 3 medium catering
			[
			'Venue Rental',
			'Party Center',
			'Banquet Hall',
			'Casino',
			'Discotheque',
			'Bar',
			'Nightclub',
			], 					// 4 heavy catering
			[
			'Air-BNB',
			'Rental-Service',
			'Apartment Rental',
			'Car / Boat Leasing',
			'Car / Boat Retailer',
			'Boat Leasing',
			'Boat Retailer',
			'Real Estate Agent',
			], 					// 5 renting and leasing
			[
			'Travel Agency',
			'Bus Company',
			'Taxi Company',
			'Car / Boat Rental',
			'Bike / Scooter Rental',
			], 					// 6 travel and transport
			
		]


		let categorySelect = document.getElementById('category--Select');
		
		
		for (let i = 1; i < mainCategories.length; i++) {
			mainCategories[i].forEach((element) => {
				//console.log(element);
				let option = document.createElement('option');
				option.value = i;
				option.text = element;
				categorySelect.appendChild(option);
			});
		}

		let parameterButtonsDiv = document.getElementById('parameters--buttons');
		
		function pushIndex(...index){
			
			let arrayList = [];

			index.forEach((i) => {
				arrayList.push(parameterButtons[i]);
			});
			
			
			console.log(arrayList);
			return arrayList;
			
		}

		buttonsCat1 = pushIndex(1, 2, 3, 4, 5, 7, 8, 9, 10);

		

	});

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
					}}
					class="form-select"
					id="category--Select"
					aria-label="Default select example"
				>
					<option selected>Select A Category</option>
				</select>
				{#if category == null}
					<div class="card-body card parameters-card">
						<div class="card">
							<div class="parameters-card-body card-body">
								<div class="btn-group parameter-buttons" role="group" id="parameters--buttons">
									
									<!-- Example Parameter Button -->
									<input 
										type="checkbox" 
										class="btn-check" ``
										id="AddStaff"
										autocomplete="off"
										on:change={(event) => {
											console.log(event.target.checked);
											if (event.target.checked) {
												let pmField = document.getElementById("parameter--fields")
												let newpmField = document.createElement('div');		
												newpmField.id = "parameterButtons[i]";								
												pmField.appendChild(newpmField);
											}
											else{
												document.getElementById("parameterButtons[i]").remove();
											}
											
										}}>
									<label class="btn btn-sm btn-outline-primary" for="AddStaff">Single toggle</label>

								</div>
						</div>

						
						</div>
						<div class="card-body card  paramaters-field" id="parameter--fields" style="margin-top: 5px;">
							<!-- Example Parameter Fields -->
							<div id="parameterButtons[1]"> <!-- index: add Staff -->
								<div class="customer-inputs input-group input-group-sm mb-3">
					
									<span 
										class="input-group-text" 
								
									>
										Staff Name
									</span>
									<input 
										type="text" 
										class="form-control"
										id="staffName"  
										placeholder="Example: John doe"
									/>
									
									<button 
										class="btn btn-outline-secondary" 
										type="button" 
											on:click={() =>{
												document.getElementById("parameterButtons[1]").remove()
											}
										}
									>
										Disable
									</button>

									<button 
										class="btn btn-outline-secondary" 
										type="button" 
										
											on:click={() => {
												//TODO
											}
										}
									>	
										Add
									</button>

								</div>
							</div>
						</div>
					</div>
				
				{:else if (category == 1)}
				<div class="card-body card parameters-card">
					<div class="card">
						<div class="parameters-card-body card-body">
							<div class="btn-group parameter-buttons" role="group" id="parameters--buttons">

								{#each buttonsCat1 as pmButtons }
									<input 
										type="checkbox" 
										class="btn-check" 
										id={pmButtons}
										autocomplete="off"
										/>
									<label class="btn btn-sm btn-outline-primary" for={pmButtons}>{pmButtons}</label>
									
								{/each}

							</div>
						</div>
						

					</div>
				</div>
				

				{/if}
				
			</div>
			<div class="card-footer"> 
				<!--link to business-->
				<div class="customer-inputs input-group input-group-sm mb-3">
					
					
						<span 
							class="input-group-text" 
							id="inputGroup-sizing-sm"
						>
							Link To Business
						</span>
						<input type="text" class="form-control" 
						bind:value={linkToBusiness}
						/>

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
					on:change={()=>{
						document.getElementById('pricing--card').style.display = 'block';
						document.getElementById('pricing--button2').style.display = 'none';
					}}
				/>
					<a
						class="btn btn-primary"
						href="/calculator"
						
					>
						Calculator
					</a>
				</div>
				<div class="card-body"> 
					<!--Pricing Card-->
					<div class="card pricing-card" style="display: none;" id="pricing--card">
						<div class="card-body pricing-card-body">
							<p class="card-text">Reviews: {amount}</p>
							<p class="card-text">Total: €{amount*4}</p>
							<p class="card-text">Price per review: €4</p>
						</div>
						<div class="card-footer">
							<button
								class="btn btn-primary"
								on:click={() => {
									dispatch('submit', {
										amount,
										linkToBusiness,
										category,
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
							>å
								Hide
							</button>
						</div>
					</div>
					<div class="true-footer">
					<input 
					type=range 
					min=0
					max=1000
					style="width: 100%"
					bind:value={amount}
					on:change={()=>{
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
								category,
							});
						}}
					>
						Buy €{amount * 4}
					</button>
					{#if $authStore.currentUser}
					<button
						class="btn btn-outline-primary"
						style="width: 100%;"
						
					>
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
		flex-wrap: wrap;
		justify-content: center;
		margin: 0;
		padding: 10px;
	}
	


</style>
