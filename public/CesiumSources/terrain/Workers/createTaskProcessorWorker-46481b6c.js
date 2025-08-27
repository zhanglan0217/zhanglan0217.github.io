define(["exports"], function (e) {
    "use strict";
    function a(e) {
        return null != e;
    }
    function i(e, r) {
        return null != e ? e : r;
    }
    (i.EMPTY_OBJECT = Object.freeze({})),
        (e.createTaskProcessorWorker = function (s) {
            let o;
            return function (e) {
                const r = e.data,
                    t = [],
                    n = { id: r.id, result: void 0, error: void 0 };
                return Promise.resolve(
                    (function (e, r, t) {
                        try {
                            return e(r, t);
                        } catch (e) {
                            return Promise.reject(e);
                        }
                    })(s, r.parameters, t)
                )
                    .then(function (e) {
                        n.result = e;
                    })
                    .catch(function (e) {
                        e instanceof Error
                            ? (n.error = {
                                  name: e.name,
                                  message: e.message,
                                  stack: e.stack,
                              })
                            : (n.error = e);
                    })
                    .finally(function () {
                        a(o) ||
                            (o = i(self.webkitPostMessage, self.postMessage)),
                            r.canTransferArrayBuffer || (t.length = 0);
                        try {
                            o(n, t);
                        } catch (e) {
                            (n.result = void 0),
                                (n.error =
                                    `postMessage failed with error: ${(function (
                                        e
                                    ) {
                                        let r;
                                        var t = e.name,
                                            n = e.message,
                                            t =
                                                ((r =
                                                    a(t) && a(n)
                                                        ? t + ": " + n
                                                        : e.toString()),
                                                e.stack);
                                        return (
                                            a(t) &&
                                                (r +=
                                                    `
` + t),
                                            r
                                        );
                                    })(e)}
  with responseMessage: ` + JSON.stringify(n)),
                                o(n);
                        }
                    });
            };
        }),
        (e.defaultValue = i),
        (e.defined = a);
});
