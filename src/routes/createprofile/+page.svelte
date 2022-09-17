<script>
    import { supabase } from '$lib/supabaseClient'
    import { user } from '$lib/sessionStore'
	import Auth from '../../lib/Auth.svelte';
	import { goto } from '$app/navigation';
  
    let loading = true
    let username = null
    let website = null
    let avatar_url = null
  
    function getProfile(node) {
    try {
      loading = true;
      const user = supabase.auth.user();
  
      supabase
        .from("users")
        .select(`username`)
        .eq("id", user?.id)
        .single()
        .then(({ data, error, status }) => {
          if (data) {
            username = data.username;
          }
          if (error && status !== 406) throw error;
        });
      } catch (error) {
        alert(error.message);
      } finally {
        loading = false;
      }
    }
  
    async function updateProfile() {
      try {
        loading = true
        const user = supabase.auth.user()
  
        const updates = {
          id: user.id,
          username,
        }
  
        let { error } = await supabase.from('profiles').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        })
  
        if (error) throw error
      } catch (error) {
        alert(error.message)
      } finally {
        loading = false
        goto("http://localhost:5173/profile")
        
      }
    }
  
    async function signOut() {
      try {
        loading = true
        let { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        alert(error.message)
      } finally {
        loading = false
      }
  
    }
  </script>
  

  <div class="container mt-10 grid place-items-center">
	<h1 class="text-3xl font-bold text-center">Select a username</h1>

    <form use:getProfile
    class="form-widget mt-5"
    on:submit|preventDefault="{updateProfile}">
        <div class="form-control w-full max-w-xs m-2">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">
                <span class="label-text">Username</span>
            </label>
            <input
                type="text"
                placeholder="Enter your username"
                class="input input-bordered w-full max-w-xs"
                bind:value={username}
            />
            <button class="btn mt-3" type="submit" disabled={loading}>{loading ?  'Loading...' : 'Submit'}</button>
        </div>
    </form>

	

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
