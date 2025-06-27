export default function TransferForm() {
  return (
    <div>
      <form>
        <label htmlFor="account_from">Account_From:</label>
        <input type="text" id="account_from" name="account_from" />
        <label htmlFor="account_To">Account_To:</label>
        <input type="text" id="account_To" name="account_To" />
        <label htmlFor="amount">Amount:</label>
        <input type="text" id="amount" name="amount" />
        <label htmlFor="currency">Currency:</label>
        <input type="text" id="currency" name="currency" />
        <label htmlFor="date">Date:</label>
        <input type="text" id="date" name="date" />
        <label htmlFor="comment">Comment:</label>
        <input type="text" id="comment" name="comment" />
        <button>Transfer</button>
      </form>
    </div>
  );
}
