module.exports = {

"[project]/.next-internal/server/app/eu/[slug]/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/not-found.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/not-found.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/lib/api/apiClient.server.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// This is the server-side API client.
// It uses the absolute URL for the currently running instance.
// Use NEXT_PUBLIC_URL if available, otherwise default to localhost for development.
__turbopack_context__.s({
    "apiFetch": (()=>apiFetch)
});
const API_URL = ("TURBOPACK compile-time value", "http://localhost:3003") || "http://localhost:3003/api";
async function apiFetch(endpoint, options = {}) {
    // We need to append /api to the base URL for server-side calls
    const url = `${API_URL}/api${endpoint}`;
    try {
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            ...options,
            // Use a short revalidation time for server-side fetches
            next: {
                revalidate: 60,
                ...options.next || {}
            }
        });
        if (!res.ok) {
            const errorBody = await res.text();
            console.error(`API Error: ${res.status} ${res.statusText} on ${url}. Body: ${errorBody}`);
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error(`Fetch error for ${url}:`, error);
        throw error;
    }
}
}}),
"[project]/src/lib/api/apiClient.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "apiFetch": (()=>apiFetch)
});
const API_URL = ("TURBOPACK compile-time value", "http://localhost:3003") || "http://localhost:3003";
async function apiFetch(endpoint, options = {}) {
    // endpoint must start with "/api"
    const url = `${API_URL}/api${endpoint}`;
    try {
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            ...options
        });
        if (!res.ok) {
            const errorBody = await res.text();
            console.error(`❌ API Error: ${res.status} on ${url}\nBody: ${errorBody}`);
            throw new Error(`API error: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error(`🚨 Fetch error for ${url}:`, error);
        throw error;
    }
}
}}),
"[project]/src/lib/api/projects.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/lib/api/projects.ts
__turbopack_context__.s({
    "getEUProjects": (()=>getEUProjects),
    "getEUProjectsClient": (()=>getEUProjectsClient),
    "getLatestEUProjects": (()=>getLatestEUProjects),
    "getLocalProjects": (()=>getLocalProjects),
    "getProjectBySlug": (()=>getProjectBySlug),
    "getProjects": (()=>getProjects),
    "getProjectsClient": (()=>getProjectsClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$apiClient$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/apiClient.server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$apiClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/apiClient.ts [app-rsc] (ecmascript)");
;
;
// LOCAL activity categories
const LOCAL_SLUGS = [
    "ledarskapsutbildning",
    "dreamacademy",
    "summercamp",
    "hostcamp",
    "kvallsoppet"
];
async function getProjects() {
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$apiClient$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetch"])('/projects');
        return res.data ?? [];
    } catch (e) {
        console.error('❌ Failed to fetch projects (server):', e);
        return [];
    }
}
async function getProjectsClient() {
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$apiClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetch"])('/projects');
        return res.data ?? [];
    } catch (e) {
        console.error('❌ Failed to fetch projects (client):', e);
        return [];
    }
}
async function getLocalProjects() {
    try {
        const all = await getProjectsClient();
        return all.filter((p)=>LOCAL_SLUGS.includes((p.category || '').toLowerCase()));
    } catch  {
        return [];
    }
}
async function getEUProjects() {
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$apiClient$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetch"])('/projects');
        const all = res.data ?? [];
        return all.filter((p)=>(p.category || '').toLowerCase() === 'eu');
    } catch  {
        return [];
    }
}
async function getLatestEUProjects() {
    try {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$apiClient$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetch"])(`/projects/eu/latest`);
        return response.data;
    } catch (error) {
        console.error("❌ Failed to fetch EU projects for navbar:", error);
        return [];
    }
}
async function getEUProjectsClient() {
    try {
        const all = await getProjectsClient();
        return all.filter((p)=>(p.category || '').toLowerCase() === 'eu');
    } catch  {
        return [];
    }
}
async function getProjectBySlug(slug) {
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$apiClient$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetch"])(`/projects/slug/${encodeURIComponent(slug)}`);
        return res.data ?? null;
    } catch (e) {
        console.error(`❌ Failed to fetch project by slug "${slug}":`, e);
        return null;
    }
}
}}),
"[project]/src/lib/utils.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn),
    "formatDate": (()=>formatDate),
    "normalizeSlug": (()=>normalizeSlug),
    "resolveProjectHref": (()=>resolveProjectHref),
    "slugify": (()=>slugify)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-rsc] (ecmascript) <locals>");
;
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function slugify(text) {
    return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");
}
function normalizeSlug(raw) {
    const s = raw.toLowerCase();
    // special cases you mentioned
    if (s === "erasmus" || s === "erasmus+") return "erasmus";
    if (s === "future narrative" || s === "future-narrative") return "future-narrative";
    return slugify(raw);
}
function formatDate(dateString) {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(dateString), "MMMM d, yyyy");
    } catch  {
        return dateString;
    }
}
function resolveProjectHref(project) {
    const safe = normalizeSlug(project.slug);
    return project.category === "EU" ? `/eu/${safe}` : `/projects/${safe}`;
}
}}),
"[project]/src/components/ui/badge.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Badge": (()=>Badge),
    "badgeVariants": (()=>badgeVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
;
}}),
"[project]/src/components/shared/PageHeader.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/components/shared/PageHeader.tsx
__turbopack_context__.s({
    "PageHeader": (()=>PageHeader)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function PageHeader({ title, description, backgroundImage, fallbackImage = "/image/default-header.png" }) {
    const imageToUse = backgroundImage || fallbackImage;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `
        relative py-20 md:py-28 text-center
        ${imageToUse ? "bg-cover bg-center bg-no-repeat" : "bg-secondary"}
      `,
        style: imageToUse ? {
            backgroundImage: `url(${imageToUse})`
        } : undefined,
        children: [
            imageToUse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/50 backdrop-blur-[1px]"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/PageHeader.tsx",
                lineNumber: 27,
                columnNumber: 22
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl md:text-5xl font-extrabold tracking-tight text-white font-headline drop-shadow-lg",
                        dangerouslySetInnerHTML: {
                            __html: title
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/shared/PageHeader.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-lg text-white/90 max-w-3xl mx-auto drop-shadow",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/src/components/shared/PageHeader.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shared/PageHeader.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shared/PageHeader.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/lib/placeholder-images.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"placeholderImages\":[{\"id\":\"news-1\",\"description\":\"Abstract network connections\",\"imageUrl\":\"https://images.unsplash.com/photo-1700427296131-0cc4c4610fc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx0ZWNobm9sb2d5JTIwYWJzdHJhY3R8ZW58MHx8fHwxNzYxODU1OTgyfDA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"technology abstract\"},{\"id\":\"news-2\",\"description\":\"Code on a screen\",\"imageUrl\":\"https://images.unsplash.com/photo-1658274474930-bb27a64022c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb2RlJTIwc2NyZWVufGVufDB8fHx8MTc2MTgzMTkzMHww&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"code screen\"},{\"id\":\"news-3\",\"description\":\"Server room\",\"imageUrl\":\"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzZXJ2ZXIlMjByb29tfGVufDB8fHx8MTc2MTgwNjI3N3ww&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"server room\"},{\"id\":\"news-4\",\"description\":\"Team meeting around a whiteboard\",\"imageUrl\":\"https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx0ZWFtJTIwbWVldGluZ3xlbnwwfHx8fDE3NjE4MjgzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"team meeting\"},{\"id\":\"event-1\",\"description\":\"Conference hall with people\",\"imageUrl\":\"https://images.unsplash.com/photo-1568304603980-85ff55550db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjb25mZXJlbmNlJTIwaGFsbHxlbnwwfHx8fDE3NjE4NjgxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"conference hall\"},{\"id\":\"event-2\",\"description\":\"Person speaking at a podium\",\"imageUrl\":\"https://images.unsplash.com/photo-1574593749297-cb33a69cd8d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzcGVha2VyJTIwcG9kaXVtfGVufDB8fHx8MTc2MTg5OTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"speaker podium\"},{\"id\":\"event-3\",\"description\":\"Workshop with people collaborating\",\"imageUrl\":\"https://images.unsplash.com/photo-1599585896662-85853131f259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx3b3Jrc2hvcCUyMGNvbGxhYm9yYXRpb258ZW58MHx8fHwxNzYxODY1Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"workshop collaboration\"},{\"id\":\"project-1\",\"description\":\"Diagram of a complex system\",\"imageUrl\":\"https://images.unsplash.com/photo-1708807524676-86a7a4d42d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzeXN0ZW0lMjBkaWFncmFtfGVufDB8fHx8MTc2MTg5OTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"system diagram\"},{\"id\":\"project-2\",\"description\":\"Data visualization dashboard\",\"imageUrl\":\"https://images.unsplash.com/photo-1599658880436-c61792e70672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxkYXRhJTIwZGFzaGJvYXJkfGVufDB8fHx8MTc2MTg0Njc0MHww&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"data dashboard\"},{\"id\":\"project-3\",\"description\":\"Robotics arm in a lab\",\"imageUrl\":\"https://images.unsplash.com/photo-1658351354155-e854d19233e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxyb2JvdGljcyUyMGxhYnxlbnwwfHx8fDE3NjE4OTkzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"robotics lab\"},{\"id\":\"author-1\",\"description\":\"Portrait of a man\",\"imageUrl\":\"https://images.unsplash.com/photo-1594672830234-ba4cfe1202dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzYxODgxOTU3fDA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"man portrait\"},{\"id\":\"author-2\",\"description\":\"Portrait of a woman\",\"imageUrl\":\"https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2MTgwMzQ2MHww&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"woman portrait\"},{\"id\":\"partner-1\",\"description\":\"Abstract logo 1\",\"imageUrl\":\"https://images.unsplash.com/photo-1726409724841-016b6f4f8b1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGxvZ298ZW58MHx8fHwxNzYxNzk4NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"abstract logo\"},{\"id\":\"partner-2\",\"description\":\"Abstract logo 2\",\"imageUrl\":\"https://images.unsplash.com/photo-1569605803663-e9337d901ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0ZWNoJTIwbG9nb3xlbnwwfHx8fDE3NjE4OTE0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"tech logo\"},{\"id\":\"partner-3\",\"description\":\"Abstract logo 3\",\"imageUrl\":\"https://images.unsplash.com/photo-1756510473714-567691ff8a2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbG9nb3xlbnwwfHx8fDE3NjE4NTAzNTF8MA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"minimalist logo\"},{\"id\":\"partner-4\",\"description\":\"Abstract logo 4\",\"imageUrl\":\"https://images.unsplash.com/photo-1759929767411-5c49ba6404bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjBsb2dvfGVufDB8fHx8MTc2MTgwNzg4OHww&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"corporate logo\"},{\"id\":\"partner-5\",\"description\":\"Abstract logo 5\",\"imageUrl\":\"https://images.unsplash.com/photo-1729830375022-b0248100c501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Z2VvbWV0cmljJTIwbG9nb3xlbnwwfHx8fDE3NjE4MDg2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"geometric logo\"},{\"id\":\"partner-6\",\"description\":\"Abstract logo 6\",\"imageUrl\":\"https://images.unsplash.com/photo-1662027008658-b615840c7deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxuYXR1cmUlMjBsb2dvfGVufDB8fHx8MTc2MTgyNTI2N3ww&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"nature logo\"},{\"id\":\"media-1\",\"imageUrl\":\"https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxhYnN0cmFjdCUyMHRlY2h8ZW58MHx8fHwxNzYxODg0OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"abstract tech\"},{\"id\":\"media-2\",\"imageUrl\":\"https://images.unsplash.com/photo-1622675363311-3e1904dc1885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxvZmZpY2UlMjBtZWV0aW5nfGVufDB8fHx8MTc2MTgzMzcxNXww&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"office meeting\"},{\"id\":\"media-3\",\"imageUrl\":\"https://images.unsplash.com/photo-1502921982-f2471545c93b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y2l0eSUyMHNreWxpbmV8ZW58MHx8fHwxNzYxODc3MTM5fDA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"city skyline\"},{\"id\":\"media-4\",\"imageUrl\":\"https://images.unsplash.com/photo-1610552050890-fe99536c2615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzYxODI4Nzk4fDA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"nature landscape\"},{\"id\":\"media-5\",\"imageUrl\":\"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NjE4OTQzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"data visualization\"},{\"id\":\"media-6\",\"imageUrl\":\"https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwZW9wbGUlMjBjb2xsYWJvcmF0aW5nfGVufDB8fHx8MTc2MTkwMjY1NXww&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"people collaborating\"},{\"id\":\"media-7\",\"imageUrl\":\"https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzZXJ2ZXIlMjByYWNrc3xlbnwwfHx8fDE3NjE5MDI2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"server racks\"},{\"id\":\"media-8\",\"imageUrl\":\"https://images.unsplash.com/photo-1631203924971-ad99ad16a936?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxicmFpbnN0b3JtaW5nJTIwc2Vzc2lvbnxlbnwwfHx8fDE3NjE4Nzk0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"brainstorming session\"},{\"id\":\"media-9\",\"imageUrl\":\"https://images.unsplash.com/photo-1675326570919-946d728e9a25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxmdXR1cmlzdGljJTIwY2l0eXxlbnwwfHx8fDE3NjE4NTc1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"futuristic city\"},{\"id\":\"media-10\",\"imageUrl\":\"https://images.unsplash.com/photo-1753998943413-8cba1b923c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjbG9zZS11cCUyMGNvZGV8ZW58MHx8fHwxNzYxOTAyNjU1fDA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"close-up code\"},{\"id\":\"media-11\",\"imageUrl\":\"https://images.unsplash.com/photo-1535378273068-9bb67d5beacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cm9ib3QlMjBhcm18ZW58MHx8fHwxNzYxODgyMjUxfDA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"robot arm\"},{\"id\":\"media-12\",\"imageUrl\":\"https://images.unsplash.com/photo-1717503167660-83e29da2e4a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxuZXR3b3JrJTIwbm9kZXN8ZW58MHx8fHwxNzYxOTAwOTIzfDA&ixlib=rb-4.1.0&q=80&w=1080\",\"imageHint\":\"network nodes\"}]}"));}}),
"[project]/src/lib/placeholder-images.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PlaceHolderImages": (()=>PlaceHolderImages)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$placeholder$2d$images$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/lib/placeholder-images.json (json)");
;
const PlaceHolderImages = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$placeholder$2d$images$2e$json__$28$json$29$__["default"].placeholderImages;
}}),
"[project]/src/lib/getMediaUrl.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getMediaUrl": (()=>getMediaUrl)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$placeholder$2d$images$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/placeholder-images.ts [app-rsc] (ecmascript)");
;
function getMediaUrl(url) {
    const fallback = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$placeholder$2d$images$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PlaceHolderImages"][0]?.imageUrl || null;
    // ❗ If no url and no fallback, return null (NOT empty string)
    if (!url || url.trim() === "") return fallback;
    // Already a full URL (ex: Cloudinary, Unsplash)
    if (url.startsWith("http")) return url;
    const base = ("TURBOPACK compile-time value", "http://localhost:3003")?.replace(/\/$/, "");
    // If base is missing, avoid returning invalid URL
    if (!base) return fallback;
    return `${base}${url.startsWith("/") ? url : "/" + url}`;
}
}}),
"[project]/src/app/eu/[slug]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/app/eu/[slug]/page.tsx
__turbopack_context__.s({
    "default": (()=>EuProjectDetailPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/projects.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-rsc] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$PageHeader$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/PageHeader.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$getMediaUrl$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/getMediaUrl.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
async function EuProjectDetailPage(props) {
    const { slug } = await props.params;
    const project = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProjectBySlug"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeSlug"])(slug));
    if (!project) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    if (project.category !== 'EU') (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    // 🔹 Pick header image from media[]
    const headerImage = project.media?.[0]?.url ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$getMediaUrl$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMediaUrl"])(project.media[0].url) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$PageHeader$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: project.title,
                description: project.description || "",
                backgroundImage: headerImage ?? undefined
            }, void 0, false, {
                fileName: "[project]/src/app/eu/[slug]/page.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container max-w-4xl mx-auto py-12 md:py-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/eu",
                        className: "inline-flex items-center gap-2 text-accent hover:underline mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/eu/[slug]/page.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            " Back to EU Projects"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/eu/[slug]/page.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        children: [
                            Array.isArray(project.tags) && project.tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 mb-6",
                                children: project.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        children: tag
                                    }, tag, false, {
                                        fileName: "[project]/src/app/eu/[slug]/page.tsx",
                                        lineNumber: 46,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/eu/[slug]/page.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this),
                            project.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                src: project.imageUrl,
                                alt: project.title,
                                width: 1200,
                                height: 675,
                                className: "w-full rounded-lg shadow-lg mb-8",
                                "data-ai-hint": project.imageHint,
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/eu/[slug]/page.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "prose dark:prose-invert lg:prose-xl mx-auto",
                                dangerouslySetInnerHTML: {
                                    __html: project.content || ''
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/eu/[slug]/page.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/eu/[slug]/page.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/eu/[slug]/page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/eu/[slug]/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/eu/[slug]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/eu/[slug]/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=_aff74d15._.js.map