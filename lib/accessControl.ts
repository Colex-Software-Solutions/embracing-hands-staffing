// src/accessRules.ts

import { Role } from "@prisma/client";

interface AccessRule {
  roles: Role[];
  methods: string[];
}

const accessRules: Record<string, AccessRule> = {
  "/staff": {
    roles: [Role.STAFF, Role.ADMIN],
    methods: ["GET"],
  },
  "/admin": {
    roles: [Role.ADMIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  "/profile": {
    roles: [Role.ADMIN, Role.FACILITY, Role.STAFF],
    methods: ["GET"],
  },
  "/facility": {
    roles: [Role.FACILITY, Role.ADMIN],
    methods: ["GET", "POST", "PUT"],
  },
  "/api/facility": {
    roles: [Role.FACILITY],
    methods: ["POST", "PUT"],
  },
  "/api/staff": {
    roles: [Role.STAFF],
    methods: ["POST", "PUT"],
  },
  "/api/job-application": {
    roles: [Role.ADMIN, Role.FACILITY, Role.STAFF],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  "/find-jobs": {
    roles: [Role.STAFF],
    methods: ["GET"],
  },
  "/job-posts": {
    roles: [Role.STAFF, Role.FACILITY, Role.ADMIN],
    methods: ["GET"],
  },
  "/shifts": {
    roles: [Role.STAFF],
    methods: ["GET"],
  },
  "/api/shift": {
    roles: [Role.STAFF, Role.FACILITY],
    methods: ["GET", "PUT", "DELETE", "POST"],
  },
  "/api/document": {
    roles: [Role.STAFF],
    methods: ["GET", "PUT", "DELETE", "POST"],
  },
  "/api/users": {
    roles: [Role.ADMIN],
    methods: ["GET", "PUT", "DELETE", "POST"],
  },
  "/handbook.pdf": {
    roles: [Role.STAFF],
    methods: ["GET"],
  },
};

export default accessRules;
