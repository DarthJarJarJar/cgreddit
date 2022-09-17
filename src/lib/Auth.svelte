<script>
	import { supabase } from '$lib/supabaseClient';
	import { user } from '$lib/sessionStore';

	let loading = false;
	let email;
	let password;
	let signUp = false;

	const handleSignUp = async () => {
		try {
			const { user, session, error } = await supabase.auth.signUp({
				email: email,
				password: password
			});
		} catch (error) {
			alert(error.error_description || error.message);
		}
	};

	const handleLoginWithDiscord = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signIn({
				provider: 'discord'
			});
			if (error) throw error;
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};

	const handleLoginWithEmailAndPassword = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signIn({
				email: email,
				password: password
			});
			if (error) throw error;
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};
</script>

<div class="container mt-10 grid place-items-center">
	<h1 class="text-3xl font-bold text-center">Login</h1>

	<div class="form-control w-full max-w-xs">
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

	<div class="form-control w-full max-w-xs">
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
		<button class="btn bg-success text-white m-4 " on:click={handleLoginWithEmailAndPassword}>
			Sign In
		</button>
	</div>

	<p>Not a user? <a href="/signup" class="t font-extrabold text-blue-600">Sign Up</a></p>


	
</div>

<style>
	.container {
		width: 80vw;
		margin-left: auto;
		margin-right: auto;
	}
	.blurple {
		background-color: #5865f2;
		color: white;
	}
</style>
