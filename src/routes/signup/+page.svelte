<script>
	import { supabase } from '$lib/supabaseClient';
	import { user } from '$lib/sessionStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let email;
	let password;
    let username;

   
        if ($user) {
           goto("/profile")
        }
   

	const handleSignUp = async () => {
		try {
			const { user, session, error } = await supabase.auth.signUp({
				email: email,
				password: password
			},
            {
                data: {
                    full_name: username
                },
				redirectTo: "http://localhost:5173/createprofile"
            }
            );
            alert("Check your inbox for a verification email.")
		} catch (error) {
			alert(error.error_description || error.message);
		}
	};

</script>


<div class="container mt-10 grid place-items-center">
	<h1 class="text-3xl font-bold text-center">Sign Up</h1>

	<div class="form-control w-full max-w-xs m-1">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Email</span>
		</label>
		<input
			type="email"
			placeholder="Enter your email"
			class="input input-bordered w-full max-w-xs"
			bind:value={email}
		/>
	</div>

    <div class="form-control w-full max-w-xs m-1">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Username</span>
		</label>
		<input
			type="email"
			placeholder="Enter your username"
			class="input input-bordered w-full max-w-xs"
			bind:value={username}
		/>
	</div>

	<div class="form-control w-full max-w-xs m-1">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Password</span>
		</label>
		<input
			type="password"
			placeholder="Enter your password"
			class="input input-bordered w-full max-w-xs"
			bind:value={password}
		/>
	</div>

	<div class="flex">
		<button class="btn bg-success text-white m-4" on:click={handleSignUp}>
			Sign Up
		</button>
	</div>

    <p>Already a user? <a href="/profile" class="t font-extrabold text-blue-600">Sign In</a></p>

</div>

<style>
	.container {
		width: 80vw;
		margin-left: auto;
		margin-right: auto;
	}

</style>
