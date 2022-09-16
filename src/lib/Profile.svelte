<script>
	import { supabase } from '../lib/supabaseClient';
	import { user } from '$lib/sessionStore';

	let loading = true;
	let username = null;
	let website = null;
	let avatar_url = null;

	function getProfile(node) {
		try {
			loading = true;
			const user = supabase.auth.user();

			supabase
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user?.id)
				.single()
				.then(({ data, error, status }) => {
					if (data) {
						username = data.username;
						website = data.website;
						avatar_url = data.avatar_url;
					}
					if (error && status !== '406') throw error;
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
                website,
                avatar_url,
                updated_at:  new Date()
            }

            let { error } = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal'
            })

            if (error) throw error

             
        } catch {
            alert(error.message)
        } finally {
            loading = false
        }
    }

    async function signOut() {
        try {
            loading = true
            let { error } = await supabase.auth.signOut()
            if (error) throw error

        }  catch(error) {
            alert(error.message)
        } finally {
            loading = false
        }
    }

    async function getUserData() {
      const user = await supabase.auth.user()
      console.log(user)
    }
</script>
