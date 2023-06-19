const std = @import("std");
const http = std.net.http;

const loggerID: []const u8 = "example";
const serverURL: []const u8 = "https://hlog.deno.dev";

pub fn logger(message: []const u8, logtype: []const u8 = "info") !void {
    var allocator = std.heap.page_allocator;
    var client = try http.Client.init(allocator);
    var response = try client.post(allocator, .{
        .url = try std.mem.format(allocator, "{s}/{s}/{s}", .{serverURL, loggerID, logtype}),
        .body = message,
    });
    if (response.status_code != http.StatusCode.Ok) {
        return error."Error: {d}".println(response.status_code);
    }
}

pub fn main() !void {
    try logger("Let the logging begin!");
}
