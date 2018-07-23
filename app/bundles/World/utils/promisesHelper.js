export default function promiseWhile(condition, errorCondition, action, afterAction, errorData = { data: { results: {} } }) {
  return new Promise((resolve, reject) => {

    if (condition()) {
      resolve(action());
      return;
    }

    if (errorCondition()) {
      resolve(errorData);
      return;
    }

    setTimeout(() => resolve(action()
      .then((resp) => afterAction(resp))
      .then(promiseWhile.bind(null, condition, errorCondition, action, afterAction))), 1000);

    return;
  });
}
