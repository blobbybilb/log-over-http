(require "cl-lib")
(require "drakma")

(defparameter *loggerID* "example")

(defun logger (message &optional (logtype "info"))
  (let ((serverURL "https://hlog.deno.dev"))
    (drakma:http-request (format nil "~A/~A/~A" serverURL *loggerID* logtype)
                         :method :post
                         :parameters `(("data" . ,message)))))


(logger "Let the logging begin!")
