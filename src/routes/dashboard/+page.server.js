export async function load({ locals }) {
  return {
    isCurrentUser: locals.user !== null,
  };
}