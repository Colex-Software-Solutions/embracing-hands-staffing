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
  "/facility": {
    roles: [Role.FACILITY, Role.ADMIN],
    methods: ["GET", "POST", "PUT"],
  },
  "api/facility": {
    roles: [Role.FACILITY],
    methods: ["POST", "PUT"],
  },
  "api/staff": {
    roles: [Role.STAFF],
    methods: ["POST", "PUT"],
  },
};

export default accessRules;
