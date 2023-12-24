import 'package:http/http.dart' as http;

const String loggerID = 'example';

enum LogType { ok, info, warn, error }

void logger(String message, {LogType logType = LogType.info}) {
  final serverURL = 'https://hlog.deno.dev';
  final url = '$serverURL/$loggerID/${logType.toString().split('.').last}';

  http.post(Uri.parse(url), body: message);
}

void main() {
  logger('Let the logging begin! - Dart');
}
