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
};

export default accessRules;
